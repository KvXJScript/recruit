export enum FormId {
    Transaction = "titleOfTransaction",
    Amount = "Amount",
}

export enum FormDetails {
    Title = 'title',
    AmountPLN = "amountPLN",
    AmountEUR = "amountEUR",
    Id = "id"
}

export enum LifeCycle {
    Init,
    Submitting
}

export function isDecimal(input){
    const regex = /^\d+(\.\d{0,2})?$/g;
    return (regex.test(input));
}