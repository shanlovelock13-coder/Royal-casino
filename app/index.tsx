import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GOLD = "#e8c36a";
const BG = "#100d0a";
const PANEL = "#211a13";
const MUTED = "#b7a98d";

type Tab = "Home" | "Games" | "Wallet" | "Profile";
type Game = "Slots" | "Blackjack" | "Roulette";

const bundles = [
  { coins: 1000, price: "£0.99", label: "Starter" },
  { coins: 5000, price: "£3.99", label: "Popular" },
  { coins: 12000, price: "£7.99", label: "Royal" },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Home");
  const [coins, setCoins] = useState(5000);
  const [spins, setSpins] = useState(0);
  const [message, setMessage] = useState("Welcome back. Your free coins are ready.");
  const [selectedGame, setSelectedGame] = useState<Game>("Slots");

  const formattedCoins = useMemo(() => coins.toLocaleString("en-GB"), [coins]);

  function spin() {
    if (coins < 100) {
      setMessage("You need more coins to play. Visit the coin shop.");
      return;
    }
    const win = Math.random() < 0.25;
    setCoins(value => value - 100 + (win ? 500 : 0));
    setSpins(value => value + 1);
    setMessage(win ? "JACKPOT! 500 virtual coins added." : "No win this time. Have another go!");
  }

  function demoPurchase(bundle: typeof bundles[number], method: string) {
    Alert.alert(
      "Demo checkout",
      `${bundle.coins.toLocaleString("en-GB")} coins · ${bundle.price}\\nPayment method: ${method}\\n\\nNo payment has been taken. Connect approved billing before launch.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Add demo coins", onPress: () => {
          setCoins(value => value + bundle.coins);
          setMessage(`${bundle.coins.toLocaleString("en-GB")} demo coins added.`);
          setTab("Wallet");
        }}
      ]
    );
  }

  const Header = () => <View style={styles.header}>
    <View>
      <Text style={styles.brand}>ROYAL CASINO</Text>
      <Text style={styles.eyebrow}>THE HOUSE OF VIRTUAL PLAY</Text>
    </View>
    <View style={styles.coinPill}><Text style={styles.coinPillText}>🪙 {formattedCoins}</Text></View>
  </View>;

  const CoinCard = () => <View style={styles.coinCard}>
    <Text style={styles.eyebrow}>YOUR VIRTUAL COIN BALANCE</Text>
    <Text style={styles.balance}>{formattedCoins} <Text style={{fontSize: 22}}>🪙</Text></Text>
    <Text style={styles.smallMuted}>Virtual coins only · No cash value · No withdrawals</Text>
  </View>;

  const GameTile = ({ title, icon, subtitle, onPress }: {title: string; icon: string; subtitle: string; onPress: () => void}) =>
    <TouchableOpacity style={styles.gameTile} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.gameIcon}>{icon}</Text>
      <Text style={styles.gameTitle}>{title}</Text>
      <Text style={styles.smallMuted}>{subtitle}</Text>
    </TouchableOpacity>;

  const SectionTitle = ({ children }: {children: string}) =>
    <Text style={styles.sectionTitle}>{children}</Text>;

  return <SafeAreaView style={styles.safe}>
    <Header />
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {tab === "Home" && <>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>WELCOME TO</Text>
          <Text style={styles.heroTitle}>ROYAL{"\\n"}<Text style={{color:GOLD}}>CASINO</Text></Text>
          <Text style={styles.heroCopy}>Play for fun. Enjoy the thrill. Coins have no cash value.</Text>
          <TouchableOpacity style={styles.goldButton} onPress={() => setTab("Games")}><Text style={styles.goldButtonText}>EXPLORE GAMES</Text></TouchableOpacity>
        </View>
        <CoinCard />
        <Text style={styles.notice}>{message}</Text>
        <SectionTitle>FEATURED GAMES</SectionTitle>
        <View style={styles.grid}>
          <GameTile title="Slots" icon="🎰" subtitle="Spin & win" onPress={() => {setSelectedGame("Slots");setTab("Games");}} />
          <GameTile title="Blackjack" icon="🃏" subtitle="Beat the dealer" onPress={() => {setSelectedGame("Blackjack");setTab("Games");}} />
          <GameTile title="Roulette" icon="🎡" subtitle="Place your play bet" onPress={() => {setSelectedGame("Roulette");setTab("Games");}} />
        </View>
        <SectionTitle>DAILY REWARD</SectionTitle>
        <TouchableOpacity style={styles.rewardCard} onPress={() => {setCoins(value => value + 250);setMessage("Daily reward claimed: 250 virtual coins.");}}>
          <Text style={{fontSize:28}}>🎁</Text>
          <View style={{flex:1}}><Text style={styles.gameTitle}>Claim 250 free coins</Text><Text style={styles.smallMuted}>Tap to collect your demo daily bonus</Text></View>
          <Ionicons name="chevron-forward" size={20} color={GOLD}/>
        </TouchableOpacity>
      </>}

      {tab === "Games" && <>
        <Text style={styles.pageTitle}>Game Lounge</Text>
        <Text style={styles.pageSub}>Choose a table and play with virtual coins.</Text>
        <View style={styles.grid}>
          <GameTile title="Slots" icon="🎰" subtitle="Reels & rewards" onPress={() => setSelectedGame("Slots")} />
          <GameTile title="Blackjack" icon="🃏" subtitle="21-style card game" onPress={() => setSelectedGame("Blackjack")} />
          <GameTile title="Roulette" icon="🎡" subtitle="Classic wheel" onPress={() => setSelectedGame("Roulette")} />
        </View>
        <View style={styles.playPanel}>
          <Text style={styles.eyebrow}>NOW PLAYING</Text>
          <Text style={styles.playTitle}>{selectedGame === "Slots" ? "🎰 Royal Reels" : selectedGame === "Blackjack" ? "🃏 Blackjack Table" : "🎡 Royal Roulette"}</Text>
          {selectedGame === "Slots" ? <>
            <Text style={styles.reels}>🍒　💎　👑</Text>
            <Text style={styles.smallMuted}>100 coins per spin · 25% demo win chance</Text>
            <TouchableOpacity style={styles.goldButton} onPress={spin}><Text style={styles.goldButtonText}>SPIN · 100 COINS</Text></TouchableOpacity>
            <Text style={styles.smallMuted}>Spins played: {spins}</Text>
          </> : <>
            <Text style={styles.gamePlaceholder}>This table is coming soon in the next build.</Text>
            <TouchableOpacity style={styles.outlineButton} onPress={() => setSelectedGame("Slots")}><Text style={styles.outlineButtonText}>PLAY SLOTS INSTEAD</Text></TouchableOpacity>
          </>}
          <Text style={styles.notice}>{message}</Text>
        </View>
      </>}

      {tab === "Wallet" && <>
        <Text style={styles.pageTitle}>My Wallet</Text>
        <CoinCard />
        <SectionTitle>COIN SHOP</SectionTitle>
        <Text style={styles.pageSub}>Demo bundles. No real payments are processed in this starter app.</Text>
        {bundles.map(bundle => <View style={styles.bundle} key={bundle.label}>
          <View style={{flex:1}}>
            <Text style={styles.gameTitle}>{bundle.label} · {bundle.coins.toLocaleString("en-GB")} coins</Text>
            <Text style={styles.smallMuted}>Virtual coins · Non-refundable demo credit</Text>
          </View>
          <Text style={styles.price}>{bundle.price}</Text>
        </View>)}
        <SectionTitle>PAYMENT OPTIONS – INTEGRATION PLACEHOLDERS</SectionTitle>
        {["Apple In-App Purchase", "Google Play Billing", "PayPal", "Debit card", "Apple Pay", "Google Pay"].map(method =>
          <TouchableOpacity key={method} style={styles.paymentRow} onPress={() => Alert.alert("Not connected", `${method} is shown as a planned payment option. No checkout is active.`)}>
            <Ionicons name="card-outline" size={21} color={GOLD}/>
            <Text style={styles.paymentText}>{method}</Text>
            <Text style={styles.comingSoon}>SETUP NEEDED</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.legal}>Real checkout must be implemented using approved store billing and payment-provider integrations. Availability depends on platform rules, country and product classification.</Text>
      </>}

      {tab === "Profile" && <>
        <Text style={styles.pageTitle}>Player Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Ionicons name="person" size={34} color={BG}/></View>
          <Text style={styles.playTitle}>Royal Player</Text>
          <Text style={styles.smallMuted}>Guest account · Local demo profile</Text>
        </View>
        <View style={styles.statRow}><Text style={styles.smallMuted}>Current balance</Text><Text style={styles.statValue}>{formattedCoins} coins</Text></View>
        <View style={styles.statRow}><Text style={styles.smallMuted}>Slots played</Text><Text style={styles.statValue}>{spins}</Text></View>
        <View style={styles.statRow}><Text style={styles.smallMuted}>Account status</Text><Text style={styles.statValue}>Demo</Text></View>
        <Text style={styles.legal}>Before launch, add secure sign-in, account deletion, privacy policy, age controls where required, customer support and responsible-play information.</Text>
      </>}
    </ScrollView>
    <View style={styles.nav}>
      {(["Home","Games","Wallet","Profile"] as Tab[]).map((item, index) => {
        const icons = ["home-outline","game-controller-outline","wallet-outline","person-outline"] as const;
        return <TouchableOpacity key={item} style={styles.navItem} onPress={() => setTab(item)}>
          <Ionicons name={icons[index]} size={21} color={tab === item ? GOLD : MUTED}/>
          <Text style={[styles.navText, tab === item && {color:GOLD}]}>{item}</Text>
        </TouchableOpacity>;
      })}
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:BG},
  header:{paddingHorizontal:20,paddingTop:12,paddingBottom:14,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#392c1c"},
  brand:{color:GOLD,fontSize:20,fontWeight:"900",letterSpacing:2},
  eyebrow:{color:MUTED,fontSize:9,letterSpacing:1.5,marginTop:3},
  coinPill:{backgroundColor:PANEL,borderColor:"#6b542b",borderWidth:1,borderRadius:20,paddingHorizontal:12,paddingVertical:8},
  coinPillText:{color:GOLD,fontWeight:"800"},
  content:{padding:18,paddingBottom:28,gap:16},
  hero:{backgroundColor:"#21180f",borderRadius:22,borderWidth:1,borderColor:"#6a512b",padding:22,minHeight:230,justifyContent:"center"},
  heroKicker:{color:MUTED,fontSize:11,letterSpacing:3},
  heroTitle:{color:"#fff4d6",fontSize:43,fontWeight:"900",lineHeight:46,letterSpacing:2,marginTop:8},
  heroCopy:{color:"#c7b99f",fontSize:13,lineHeight:19,marginTop:8,maxWidth:260},
  goldButton:{backgroundColor:GOLD,paddingVertical:14,paddingHorizontal:18,borderRadius:12,alignItems:"center",marginTop:16},
  goldButtonText:{color:"#20170b",fontWeight:"900",letterSpacing:1,fontSize:12},
  coinCard:{backgroundColor:PANEL,borderRadius:18,padding:18,borderWidth:1,borderColor:"#5b4729"},
  balance:{fontSize:34,fontWeight:"900",color:GOLD,marginVertical:6},
  smallMuted:{color:MUTED,fontSize:11,lineHeight:16},
  notice:{color:"#e7d4a5",fontSize:12,lineHeight:18,backgroundColor:"#211a13",padding:12,borderRadius:10,overflow:"hidden"},
  sectionTitle:{color:GOLD,fontSize:12,fontWeight:"900",letterSpacing:1.5,marginTop:3},
  grid:{flexDirection:"row",gap:9},
  gameTile:{flex:1,backgroundColor:PANEL,borderRadius:15,paddingVertical:17,paddingHorizontal:8,alignItems:"center",borderWidth:1,borderColor:"#3e3020"},
  gameIcon:{fontSize:31,marginBottom:8},
  gameTitle:{color:"#fff1d1",fontSize:13,fontWeight:"800"},
  rewardCard:{flexDirection:"row",alignItems:"center",gap:12,backgroundColor:PANEL,borderRadius:14,padding:15,borderWidth:1,borderColor:"#4e3b20"},
  pageTitle:{color:"#fff1d1",fontSize:27,fontWeight:"900"},
  pageSub:{color:MUTED,fontSize:13,lineHeight:19,marginTop:-10},
  playPanel:{backgroundColor:PANEL,borderRadius:20,padding:18,borderWidth:1,borderColor:"#624a27",alignItems:"center",gap:12},
  playTitle:{color:"#fff1d1",fontSize:21,fontWeight:"900",marginTop:4},
  reels:{fontSize:35,backgroundColor:"#100d0a",padding:18,borderRadius:14,overflow:"hidden"},
  gamePlaceholder:{color:MUTED,textAlign:"center",padding:18},
  outlineButton:{borderWidth:1,borderColor:GOLD,borderRadius:12,padding:13,alignItems:"center",width:"100%"},
  outlineButtonText:{color:GOLD,fontWeight:"800",fontSize:11,letterSpacing:1},
  bundle:{backgroundColor:PANEL,borderRadius:14,padding:15,flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:"#40311f",gap:10},
  price:{color:GOLD,fontWeight:"900",fontSize:17},
  paymentRow:{flexDirection:"row",alignItems:"center",gap:12,padding:14,backgroundColor:PANEL,borderRadius:12},
  paymentText:{color:"#fff1d1",fontWeight:"700",flex:1,fontSize:13},
  comingSoon:{color:MUTED,fontSize:8,fontWeight:"800",letterSpacing:0.5},
  legal:{color:"#a99b82",fontSize:10,lineHeight:16,marginTop:6},
  profileCard:{alignItems:"center",padding:25,backgroundColor:PANEL,borderRadius:18},
  avatar:{width:66,height:66,borderRadius:33,backgroundColor:GOLD,alignItems:"center",justifyContent:"center",marginBottom:12},
  statRow:{flexDirection:"row",justifyContent:"space-between",paddingVertical:15,borderBottomWidth:1,borderBottomColor:"#34291d"},
  statValue:{color:"#fff1d1",fontWeight:"800"},
  nav:{flexDirection:"row",backgroundColor:"#19130e",borderTopWidth:1,borderTopColor:"#392c1c",paddingTop:10,paddingBottom:8},
  navItem:{flex:1,alignItems:"center",gap:4},
  navText:{fontSize:10,color:MUTED,fontWeight:"700"}
});
