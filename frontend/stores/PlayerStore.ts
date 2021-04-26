import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';
import RootStore from './RootStore';
import axios, { AxiosError } from 'axios';

export class PlayerStore {
    private rootStore: RootStore;
    @observable
    id: number | null;
    @observable
    totalScore: number ;
    @observable
    timer: number ;
    @observable
    choice: number | null;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.timer = 0;
        this.totalScore = 0;
        this.choice = null;
    }

    @action
    async setTimer(timer): Promise<void> {
        this.timer = timer;
    };


    async setChoice(choice): Promise<void> {
        this.choice = choice;
    };


    @action
    async UpdateScore(): Promise<void> {
        this.totalScore += this.timer;
    };
}

export default PlayerStore;