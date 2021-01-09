import ORMModel from '@vuex-orm/core/lib/model/Model'
import { Components } from '@vuex-orm/core/lib/plugins/use'
import Database from '@vuex-orm/core/lib/database/Database'
import RootState from '@vuex-orm/core/lib/modules/contracts/RootState'
import Context from './Context'

export type DispatchFunction = (action: string, data: Data) => Promise<any>

/**
 * Defines contxt singleton interface.
 */
export interface ContextInterface {
  instance: Context;
  components: Components;
  options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;
  database: Database;
  loki: Loki;
}

/**
 * defines options passed to new plugin-lokijs.
 */
export interface VuexORMLokiOptions {
  database: Database,
  options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;
  hydrationCompletedCallback: any;
}

/**
 * defines payload sent to a insert dispatch method.
 */
export interface dispatchInsertPayload {
  data: Object;
};

/**
 * defines payload sent to a get dispatch method.
 */
export interface dispatchGetPayload {
  id: Number;
}

/**
 * defines action parameters object.
 */
export interface ActionParams {
  commit: any;
  dispatch: DispatchFunction;
  getters: any;
  rootGetters: any;
  rootState: any;
  state: RootState;
  filter?: Filter;
  id?: number;
  data?: Data;
  args?: Arguments;
  variables?: Arguments;
  query?: string;
  multiple?: boolean;
  name?: string;
}

/**
 * defines interface
 */
export interface insertDocCollection {
  [key: string]: Array<Object>;
}

/**
 * data objet definition
 */
export interface Data {
  [index: string]: any;
}

export interface Filter {
  [index: string]: any;
}

export interface Arguments {
  [index: string]: any;
}
