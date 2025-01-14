import { ModelCtor } from 'sequelize-typescript';
import { User } from './User';
// Я назвал так модель файла, чтобы не путать с классом File из библиотеки Buffer
import { File as FileModel } from './File';

export const models: ModelCtor[] = [User, FileModel];
