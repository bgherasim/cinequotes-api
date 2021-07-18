const {Firestore} = require('@google-cloud/firestore');
const initialData = require('./test/testData.json');
const clear = require('./helpers/clearFirestore');
const seed = require('./helpers/seefFirestore');
const firestore = new Firestore({
  projectId: 'dummy',
});

const clearAndSeed = async () => {
  await clear();
  await seed(firestore, initialData);
};

clearAndSeed(firestore, initialData).
    then(() => {console.log('finish');}).
    catch(console.error);