import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  async register(name: string, email: string, password: string) {
    const exists = await this.repo.findOne({ where: { email } });
    if (exists) throw new UnauthorizedException('Email already exists');

    const user = this.repo.create({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await this.repo.save(user);

    const token = jwt.sign({ id: user.id }, 'secret');

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid password');

    const token = jwt.sign({ id: user.id }, 'secret');

    return { user, token };
  }

  async me(token: string) {
    try {
      const payload: any = jwt.verify(token, 'secret');
      return await this.repo.findOne({ where: { id: payload.id } });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
