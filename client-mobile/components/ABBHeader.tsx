import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export default function ABBHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoText}>ABB</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.title}>Altyapı Bildirim Sistemi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryDark,
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.primaryDark,
    letterSpacing: 1.5,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
});