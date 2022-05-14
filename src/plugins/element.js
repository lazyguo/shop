import Vue from 'vue'
import {
  Button,
  FormItem,
  Form,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Pagination,
  Image,
  Dialog,
  Upload,
  MessageBox,
  Select,
  Option,
  Tag,
  Popconfirm,
  Drawer,
  Row,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Avatar
} from 'element-ui'

Vue.use(Popconfirm)
Vue.use(Avatar)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Drawer)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox.confirm