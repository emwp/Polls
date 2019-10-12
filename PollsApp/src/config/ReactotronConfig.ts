import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "PollsApp"
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/
    },
    editor: false,
    errors: { veto: () => false },
    overlay: false,
  })
  .connect();