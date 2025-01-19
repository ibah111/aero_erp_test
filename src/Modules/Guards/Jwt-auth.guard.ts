import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import BlacklistTokens from '../Databases/Sqlite.database/models/BlacklistTokens';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(BlacklistTokens, 'sqlite')
    private readonly moodelBlacklistTokens: typeof BlacklistTokens,
  ) {
    super();
  }
  public blacklist = new Array<string>();

  public async addToBlacklist(token: string): Promise<void> {
    const jwtDecode = this.jwtService.decode(token);

    await this.moodelBlacklistTokens
      .create({
        token,
        r_user_id: jwtDecode.sub,
        expired_in: jwtDecode.exp,
      })
      .then((res) => console.log('Added to blacklist'.toUpperCase().red, res));
  }

  public async isBlacklisted(
    token: string,
  ): Promise<boolean | UnauthorizedException> {
    const tokenCheck = await this.moodelBlacklistTokens.findOne({
      where: {
        token,
      },
    });
    console.log('isBlackListed: ', tokenCheck);
    if (tokenCheck === null) {
      return false;
    } else return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ').pop();
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const check = await this.isBlacklisted(token);
    console.log('isBlacklisted: ', check);
    if (check === true) {
      return false;
    }
    return true;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async clearBlackList() {
    const currUnixTimeMs = Date.now();
    const unixSec = Math.floor(currUnixTimeMs / 1000);
    const tokens = await this.moodelBlacklistTokens.findAll({
      attributes: ['id', 'expired_in'],
      where: {
        expired_in: {
          [Op.gte]: unixSec,
        },
      },
    });
    const collection = tokens.map((item) => item.id);
    await this.moodelBlacklistTokens
      .destroy({
        where: {
          id: {
            [Op.in]: collection,
          },
        },
      })
      .then((items) => console.log('tokens been destoyed count: ', items));
  }
}
