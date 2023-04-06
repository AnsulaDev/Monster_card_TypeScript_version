import { useState, useEffect, ChangeEvent} from 'react';
import { getData } from './utils/data.utils';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
}
const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const [filterMonsters, setFilterMonsters] = useState(monsters);

  
  //componentDidMount(){
  useEffect(() => {

    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    };
    fetchUsers();

  }, []);
  useEffect(() =>{
    const newFilterMonsters = monsters.filter((monster) => {
      return  monster.name.toLocaleLowerCase().includes( searchField );
    });
    setFilterMonsters(newFilterMonsters);
  }, [monsters, searchField]);//we want to change the filter monster only whenever this value changed
  
    
  

  const  onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const searchFieldString =event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString);
  }
  
  return (
    <div className="App">
        <h1 className="app-title">Monster Cards</h1>
    
      <SearchBox 
        className ='monsters-search-box'
        onChangeHandler = {onSearchChange }
        placeholder ={ 'search monsters'} />
      <CardList monsters = {filterMonsters}/>
    </div>
  );  

}
  


export default App;
