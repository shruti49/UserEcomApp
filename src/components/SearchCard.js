import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import CustomInputText from './CustomInputText';
import {Icon} from 'react-native-eva-icons';

const SearchCard = ({productList, setFilteredProductList}) => {
  const [searchText, setSearchText] = useState();

  const handleSearchText = searchedText => {
    setSearchText(searchedText);
  };

  const handleSearch = e => {
    if (searchText.length > 2) {
      const filteredList = productList.filter(searchItem =>
        searchItem._data.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredProductList(filteredList);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredProductList(productList);
  };

  return (
    <View className="flex-row justify-between mb-8">
      <CustomInputText
        placeholder="Type here"
        style="w-[72%]"
        value={searchText}
        handleChange={handleSearchText}
      />
      <View className="w-3/12 flex-row justify-between">
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-purple-800 justify-center px-2 rounded-md mr-2">
          <Icon name="search-outline" width={32} height={32} fill={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearSearch}
          className="bg-red-500 justify-center px-2 rounded-md">
          <Icon
            name="trash-2-outline"
            width={32}
            height={32}
            fill={'#ffffff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchCard;
