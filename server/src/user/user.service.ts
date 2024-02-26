import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    findByUsername(username: string, select?: FindOptionsSelect<User>) {
        return this.userRepository.findOne({ where: { username }, select });
    }

    async save(user: User) {
        return this.userRepository.save(user);
    }
}
