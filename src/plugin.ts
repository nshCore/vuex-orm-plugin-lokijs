import VuexORMLoki from './vuex-orm-loki'
import { Components, Plugin } from '@vuex-orm/core/lib/plugins/use'
import Database from '@vuex-orm/core/lib/database/Database'
import { VuexORMLokiOptions } from './common/Interfaces'

export default class VuexORMLokiPlugin implements Plugin {
  public static instance: VuexORMLokiPlugin;

  public static install (components: Components, options: VuexORMLokiOptions, hydrationCompletedCallback: any) : VuexORMLokiPlugin {
    VuexORMLokiPlugin.instance = new VuexORMLoki(components, options.database, options.options, options.hydrationCompletedCallback)
    return VuexORMLokiPlugin.instance
  }
}
