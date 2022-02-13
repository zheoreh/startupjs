import { Platform } from 'react-native'
import { useDoc } from 'startupjs'

const OS = Platform.OS

let resolved

const promise = new Promise(resolve => {
  setTimeout(() => {
    resolved = true
    resolve()
  }, 1000)
})

export default function useNeedUpdate (criticalVersion) {
  if (!resolved) throw promise
  console.log('>>> useNeedUpdate')
  const [version, $version] = useDoc('service', 'version')
  console.log('>>>>>>> GOT DATA', { $version, version })
  const newOsVersion = $version.get(`criticalVersion.${OS}`)
  const currentOsVersion = criticalVersion && criticalVersion[OS]
  return currentOsVersion < newOsVersion
}
