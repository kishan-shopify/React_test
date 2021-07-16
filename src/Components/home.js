import { Tabs } from 'antd';
import Todos from './todos';
import Users from './users';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Home = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Todos" key="1">
      <Todos/>
    </TabPane>
    <TabPane tab="Users" key="2">
      <Users/>
    </TabPane>
  </Tabs>
);

export default Home;