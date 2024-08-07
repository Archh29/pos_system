// components/SuspendResume.js
import useLocalStorage from '../hooks/useLocalStorage'; // Adjust path as needed

const SuspendResume = () => {
  const [suspendedTransactions, setSuspendedTransactions] = useLocalStorage('suspended', []);

  const suspendTransaction = (items) => {
    setSuspendedTransactions(prev => [...prev, { date: new Date(), items }]);
    // Optionally clear the current items
  };

  const resumeTransaction = (transaction) => {
    // Resume the selected transaction
  };

  return (
    <div>
      <button onClick={() => suspendTransaction(items)}>Suspend</button>
      <ul>
        {suspendedTransactions.map((trans, index) => (
          <li key={index}>
            {trans.date.toString()}
            <button onClick={() => resumeTransaction(trans)}>Resume</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuspendResume;
