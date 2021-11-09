import { Options } from '../app/options';

export class Question {
    id!: number;
    question!: string;
    options!: Options[];

    constructor(data: any) {
        if(data != {}) {
            this.id = data.id;
            this.question = data.question;
            this.options = [];
            data.options.forEach((o: any) => {
                this.options.push(new Options(o));
            });
        }
    }
}
