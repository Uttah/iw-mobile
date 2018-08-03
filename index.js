import './App/Config/ReactotronConfig'
import Expo from 'expo'

const Entrypoint = require('./App/Containers/App').default

Expo.registerRootComponent(Entrypoint)
