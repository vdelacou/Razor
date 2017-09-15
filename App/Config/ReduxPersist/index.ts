import { AsyncStorage } from 'react-native';
import { PersistorConfig, Storage } from 'redux-persist';
import createEncryptor, { EncryptorConfig } from 'redux-persist-transform-encrypt';

// change here the key for encryption
const encryptorConfig: EncryptorConfig = {
    secretKey: 'my-super-secret-key-to-change',
};

// create the encryptor
const encryptor = createEncryptor(encryptorConfig);

// object for the configuration of the persist store
const persistorConfig: PersistorConfig = {
    storage: AsyncStorage as Storage, // have to cast as Asyncstorage doesnot implements Storage perfectly
    // blacklist: ['crud', 'nav'], // reducer keys that you do NOT want stored to persistence here
    // whitelist: ['auth'],
    // Optionally, just specify the keys you DO want stored to persistence. An empty array means 'don't store any reducers'
    transforms: [
        encryptor,
    ],
};

// Manage version of store to persist. More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
export const REDUX_PERSIST = {
    active: false,
    reducerVersion: '1.0',
    storeConfig: persistorConfig,
};

