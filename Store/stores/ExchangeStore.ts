import { observable } from 'mobx';
import { action, makeAutoObservable } from "mobx";

enum ExchangeRate {
    Euro = 4.382
}

export interface Item {
    title: string,
    amountPLN: number,
    amountEUR: number
    id: string
}

export default class ExchangeStore {
    @observable current: Item[] = [];
    @observable euroSum: number = 0;
    @observable euroValue = ExchangeRate.Euro

    constructor() {
        makeAutoObservable(this);
    }

    @action
    addItem(item: Item) {
        this.euroSum = this.euroSum + item.amountEUR
        this.current = [...this.current, item];
    }

    @action
    setNewEuroValue(value: number) {
        this.euroValue = value
    }

    @action
    removeItem(id: string){
        const item = this.current.find(i=> i.id === id)
        const indexOfRemovedItem = this.current.indexOf(item);
        const newCurrent = [...this.current];
        newCurrent.splice(indexOfRemovedItem, 1)
        this.current = newCurrent
        this.euroSum = this.euroSum - item.amountEUR
    }
}
