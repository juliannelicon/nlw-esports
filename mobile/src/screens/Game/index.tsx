import { useEffect, useState } from 'react';

import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { DuaCardProps, DuoCard } from '../../components/DuoCard';
import { Background } from '../../components/Background';

import { styles } from './styles';

import { THEME } from '../../theme';

export function Game() {
  const [duos, setDous] = useState<DuaCardProps[]>([]);

  const route = useRoute();

  const navigation = useNavigation();

  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.1.193:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDous(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            style={styles.logo}
            source={logoImg}
          />

          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => { }} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.empatyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
              <Text style={styles.empatyListText}>
                Não há anúncios publicados ainda.
              </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}