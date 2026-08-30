import TransactionCard from "@/features/transactions/components/TransactionCard";

export default function TransactionCards({ transactions, onEdit, onDelete }) {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onEdit={() => onEdit(transaction)}
          onDelete={() => onDelete(transaction)}
        />
      ))}
    </>
  );
}