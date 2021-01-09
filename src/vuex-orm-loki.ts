import { Components } from '@vuex-orm/core/lib/plugins/use'
import Context from './common/Context'
import modelMethods from './methods/model'
import Database from '@vuex-orm/core/lib/database/Database'
import { dispatchInsertPayload } from './common/Interfaces'

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>, hydrationCompletedCallback: any) {
    Context.setup(components, database, options, hydrationCompletedCallback)
    VuexORMLoki.setupModelMethods()
  }

  /**
   * Allow everything to read the context.
   */
  public getContext (): Context {
    return Context.getInstance()
  }

  private static setupModelMethods () {
    const context: Context = Context.getInstance()
    const model: any = context.components.Model

    const {
      $insert,
      $update,
      $delete,
      $find,
      $all
    } = modelMethods

    model.$insert = $insert(context)
    model.$update = $update(context)
    model.$delete = $delete(context)
    model.$find = $find(context)
    model.$all = $all(context)
  }
}
