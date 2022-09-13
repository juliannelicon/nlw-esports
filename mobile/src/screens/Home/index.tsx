import { FlatList, Image, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';

import { GAMES } from '../../utils/games'

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={logoImg}
      />

      <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard data={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}