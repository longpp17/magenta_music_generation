# rxjs-worker-subject

`rxjs-worker-subject` is an extension of the [RxJS Subject](https://rxjs-dev.firebaseapp.com/guide/subject),
a wrapper, which allows to work with [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
using RxJS syntax.

## Installation

```
npm install rxjs-worker-subject
```

## Usage
worker.ts
```typescript
addEventListener('message', ({ data }) => postMessage(data));
```

index.ts
```typescript
const workerSubj = new WorkerSubject<string, string>(new Worker('./worker', { type: 'module' }));

workerSubj.subscribe(response => {
  console.log(response);
});

workerSubj.next('ping');
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
