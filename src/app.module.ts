import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserRepository } from "./modules/auth/user.repository";
import { BoardsModule } from "./modules/boards/boards.module";
import { AuthTokenMiddleware } from "./utils/auth.token.middleware";

@Module({
    imports: [
        //typeorm의 createConnection와 같은 파라미터를 제공받으며 App 전체에서 접근 가능한 Context의 connection을 주입받습니다.
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmModule.forFeature([UserRepository]),
        AuthModule,
        BoardsModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthTokenMiddleware)
            .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
