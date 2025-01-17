import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class TokenService {
  private blacklist = new Set<string>();
  constructor(private readonly jwtService: JwtService) {}
  addToBlacklist(token: string): void {
    this.blacklist.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklist.has(token);
  }
}
