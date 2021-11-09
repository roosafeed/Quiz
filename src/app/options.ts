export class Options {
    id!: number;
    value!: string;
    isAnswer!: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.value = data.value;
        this.isAnswer = data.isAnswer;
    }
}
