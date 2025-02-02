export type TransactionData = {
  "id": number,
  "date": string,
  "transactionItem": TransactionItemData
}

export type TransactionItemData = {
  "amount": number,
  "category": string,
  "description": string
}
