// https://fontawesome.com/icons?d=listing&m=free
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faRefresh,
  faArrowUpRightFromSquare,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)
library.add(faRefresh)
library.add(faArrowUpRightFromSquare)
library.add(faChevronRight)
library.add(faChevronDown)

Vue.component('Fa', FontAwesomeIcon)
