import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './controllers/postagem.controller';
import { PostagemService } from './services/postagem.service';
import { TemaModule } from '../tema/tema.module';
import { TemaService } from '../tema/services/tema.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule, UsuarioModule, AuthModule],
    controllers: [PostagemController],
    providers: [PostagemService, TemaService],
    exports: [TypeOrmModule],
})
export class PostagemModule {}