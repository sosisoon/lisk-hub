import Lisk from 'lisk-elements';

export const listAccountDelegates = (activePeer, address) =>
  activePeer.votes.get({ address, limit: '101' });

export const listDelegates = (activePeer, options) => new Promise((resolve, reject) => {
  if (!activePeer) {
    reject();
  } else {
    activePeer.delegates.get(options).then(response => resolve(response));
  }
});

export const getDelegate = (activePeer, options) =>
  activePeer.delegates.get(options);

export const vote = (activePeer, secret, publicKey, votes, unvotes, secondSecret = null) => {
  const transaction = Lisk.transaction.castVotes({
    votes,
    unvotes,
    passphrase: secret,
    secondPassphrase: secondSecret,
  });
  return new Promise((resolve, reject) => {
    activePeer.transactions.broadcast(transaction).then(() => resolve(transaction)).catch(reject);
  });
};

export const getVotes = (activePeer, address) =>
  activePeer.votes.get({ address });

export const getVoters = (activePeer, publicKey) =>
  activePeer.voters.get({ publicKey });

export const registerDelegate = (activePeer, username, passphrase, secondPassphrase = null) => {
  const data = { username, passphrase };
  if (secondPassphrase) {
    data.secondPassphrase = secondPassphrase;
  }
  return new Promise((resolve, reject) => {
    const transaction = Lisk.transaction.registerDelegate({ ...data });
    activePeer.transactions
      .broadcast(transaction)
      .then(() => {
        resolve(transaction);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
