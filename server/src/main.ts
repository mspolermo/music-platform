import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5001;
        const app = await NestFactory.create(AppModule);

        await app.listen(PORT, () => console.log('Server started on ' + PORT));
    } catch (e) {
        console.log(e);
    }
};

start();