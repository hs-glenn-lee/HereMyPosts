import Vue from 'vue';
import Vuex from 'vuex';

import manager from '@/store/modules/manager.js'
import sign from '@/store/modules/sign.js'
import categoryTree from '@/store/modules/category-tree.js'
import article from '@/store/modules/article.js'
import alert from '@/store/modules/alert.js';
import tag from '@/store/modules/tag.js'

import ArticleListPaneUi from '@/store/modules/article-list-pane-ui.js';
import CategoryPaneUi from '@/store/modules/category-pane-ui.js';
import TagPaneUi from '@/store/modules/tag-pane-ui.js';
import viewer from '@/store/modules/viewer/viewer.js';
import RightClickMenuUi from '@/store/modules/right-click-menu-ui.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  modules: {
    manager,
    sign,
    categoryTree,
    article,
    alert,
    tag,

    ArticleListPaneUi,
    CategoryPaneUi,
    TagPaneUi,
    RightClickMenuUi,
    viewer
  }
})
