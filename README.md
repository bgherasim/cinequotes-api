# cinequotes-api
Cinequotes API

## Install
```bash
cd cinequotes-api
npm install
```

## Prerequisites

1) Make sure a Firestore emulator runs locally - ``host: 0.0.0.0``, ``port: 8505``
2) Make sure a PubSub emulator runs locally - ``host: 0.0.0.0``, ``port: 8085``

## Run

Make sure you have the [Google Translate Worker](https://github.com/bogdangherasim1992/cinequotes-translate-worker) running before starting the API.

```bash
export PUBSUB_EMULATOR_HOST=0.0.0.0:8085
export FIRESTORE_EMULATOR_HOST=0.0.0.0:8505
npm start
```
