// BLACKRACK AI BLOCKCHAIN - MOBILE APP P2P INFINITY - OWNER: Golden diamond 9
// BRB + UGAS AI + P2P INFINITY + AI ROBOT - MOBILE APP - BETTER THAN BINANCE P2P
// Owner: Golden diamond 9 - 100% Owner - All rights reserved - Final Clean Mobile
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = "http://192.168.1.100:8000"; // CHANGE TO YOUR SERVER IP - e.g. http://localhost:8000 or Render URL https://your-app.onrender.com
const OWNER = "Golden diamond 9";

export default function App() {
  const [activeTab, setActiveTab] = useState('p2p');
  const [orders, setOrders] = useState([]);
  const [robots, setRobots] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  // P2P Form
  const [p2pUser, setP2pUser] = useState('Golden diamond 9');
  const [p2pType, setP2pType] = useState('SELL');
  const [p2pFrom, setP2pFrom] = useState('BRB');
  const [p2pTo, setP2pTo] = useState('UGAS AI');
  const [p2pAmount, setP2pAmount] = useState('100');
  const [p2pPrice, setP2pPrice] = useState('1000');
  const [p2pPayment, setP2pPayment] = useState('Bank Transfer');

  // Trade Form
  const [tradeOrderId, setTradeOrderId] = useState('');
  const [tradeBuyer, setTradeBuyer] = useState('Trader');
  const [tradeAmount, setTradeAmount] = useState('10');

  // Robot Form
  const [robotId, setRobotId] = useState('AI-ROBOT-001-NOMA');
  const [robotTask, setRobotTask] = useState('Planting maize 1 hectare - Autonomous - Owner Golden diamond 9');
  const [chatRobotId, setChatRobotId] = useState('AI-ROBOT-009-GENERAL');
  const [chatMessage, setChatMessage] = useState('hello');
  const [chatReply, setChatReply] = useState('AI Robot will reply here - Owner Golden diamond 9');

  const apiGet = async (path) => {
    try {
      const res = await fetch(`${API_URL}${path}`);
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  };

  const apiPost = async (path, body) => {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  };

  const loadDashboard = async () => {
    setLoading(true);
    const d = await apiGet('/api/dashboard');
    setDashboard(d);
    setLoading(false);
  };

  const loadOrders = async () => {
    setLoading(true);
    const d = await apiGet('/api/p2p/orders');
    setOrders(d.orders || []);
    setLoading(false);
  };

  const loadRobots = async () => {
    setLoading(true);
    const d = await apiGet('/api/robots');
    setRobots(d.robots || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
    loadOrders();
    loadRobots();
  }, []);

  const createOrder = async () => {
    setLoading(true);
    const r = await apiPost('/api/p2p/create-order', {
      username: p2pUser,
      type: p2pType,
      from_token: p2pFrom,
      to_token: p2pTo,
      amount: parseFloat(p2pAmount),
      price: parseFloat(p2pPrice),
      payment: p2pPayment
    });
    Alert.alert('Order Created', `${r.order_id} - ${r.username} - ${r.type} ${r.amount} ${r.from_token} -> ${r.to_token} - Owner Golden diamond 9`);
    loadOrders();
    loadDashboard();
    setLoading(false);
  };

  const executeTrade = async () => {
    if (!tradeOrderId) {
      Alert.alert('Error', 'Enter Order ID - Owner Golden diamond 9');
      return;
    }
    setLoading(true);
    const r = await apiPost('/api/p2p/trade', {
      order_id: tradeOrderId,
      buyer: tradeBuyer,
      amount: parseFloat(tradeAmount)
    });
    if (r.error) {
      Alert.alert('Error', r.error);
    } else {
      Alert.alert('Trade Executed', `${r.trade_id} - ${r.seller} -> ${r.buyer} - ${r.amount} ${r.from_token} -> ${r.to_token} = ${r.total} - Owner Golden diamond 9`);
      loadOrders();
      loadDashboard();
    }
    setLoading(false);
  };

  const executeRobotTask = async () => {
    setLoading(true);
    const r = await apiPost('/api/robot/task', { robot_id: robotId, task: robotTask });
    Alert.alert('Robot Task', `Robot ${r.robot_id} - ${r.type} - Task: ${r.task} - Reward: ${r.total_brb} BRB + ${r.total_ugas} UGAS AI - Battery: ${r.battery}% - Owner Golden diamond 9`);
    loadRobots();
    loadDashboard();
    setLoading(false);
  };

  const chatWithRobot = async () => {
    setLoading(true);
    const r = await apiPost('/api/robot/chat', { robot_id: chatRobotId, message: chatMessage });
    setChatReply(`Robot: ${r.reply} - Battery: ${r.battery}% - Status: ${r.status} - Owner: ${r.owner}`);
    setLoading(false);
  };

  const TabButton = ({ id, label }) => (
    <TouchableOpacity style={[styles.tab, activeTab === id && styles.tabActive]} onPress={() => setActiveTab(id)}>
      <Text style={[styles.tabText, activeTab === id && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* HEADER - OWNER GOLDEN DIAMOND 9 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BLACKRACK AI BLOCKCHAIN</Text>
        <Text style={styles.headerSubtitle}>BRB + UGAS AI - AI ROBOT - P2P Infinity - Better than Binance P2P</Text>
        <View style={styles.ownerBadge}>
          <Text style={styles.ownerBadgeText}>OWNER: Golden diamond 9 - 100% Owner - 10M BRB + 100M UGAS AI</Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TabButton id="p2p" label="P2P Trading" />
        <TabButton id="robots" label="AI Robots" />
        <TabButton id="dashboard" label="Dashboard" />
      </View>

      {loading && <ActivityIndicator color="#d4af37" style={{ margin: 10 }} />}

      <ScrollView style={styles.content}>

        {/* P2P TAB - OWNER GOLDEN DIAMOND 9 */}
        {activeTab === 'p2p' && (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Create P2P Order - Owner Golden diamond 9</Text>
              <TextInput style={styles.input} value={p2pUser} onChangeText={setP2pUser} placeholder="Username - Owner Golden diamond 9" placeholderTextColor="#666" />
              <View style={styles.row}>
                <TouchableOpacity style={[styles.smallBtn, p2pType === 'SELL' && styles.smallBtnActive]} onPress={() => setP2pType('SELL')}><Text style={styles.smallBtnText}>SELL</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.smallBtn, p2pType === 'BUY' && styles.smallBtnActive]} onPress={() => setP2pType('BUY')}><Text style={styles.smallBtnText}>BUY</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.smallBtn, p2pFrom === 'BRB' && styles.smallBtnActive]} onPress={() => setP2pFrom(p2pFrom === 'BRB' ? 'UGAS AI' : 'BRB')}><Text style={styles.smallBtnText}>From: {p2pFrom}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.smallBtn, p2pTo === 'UGAS AI' && styles.smallBtnActive]} onPress={() => setP2pTo(p2pTo === 'UGAS AI' ? 'BRB' : 'UGAS AI')}><Text style={styles.smallBtnText}>To: {p2pTo}</Text></TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 1 }]} value={p2pAmount} onChangeText={setP2pAmount} placeholder="Amount" keyboardType="numeric" placeholderTextColor="#666" />
                <TextInput style={[styles.input, { flex: 1 }]} value={p2pPrice} onChangeText={setP2pPrice} placeholder="Price" keyboardType="numeric" placeholderTextColor="#666" />
              </View>
              <TextInput style={styles.input} value={p2pPayment} onChangeText={setP2pPayment} placeholder="Payment - Bank Transfer" placeholderTextColor="#666" />
              <TouchableOpacity style={styles.button} onPress={createOrder}><Text style={styles.buttonText}>Create Order - P2P Infinity - Owner Golden diamond 9</Text></TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Execute Trade - Escrow Secure - Owner Golden diamond 9</Text>
              <TextInput style={styles.input} value={tradeOrderId} onChangeText={setTradeOrderId} placeholder="Order ID e.g. P2P-000001" placeholderTextColor="#666" />
              <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 2 }]} value={tradeBuyer} onChangeText={setTradeBuyer} placeholder="Buyer" placeholderTextColor="#666" />
                <TextInput style={[styles.input, { flex: 1 }]} value={tradeAmount} onChangeText={setTradeAmount} placeholder="Amount" keyboardType="numeric" placeholderTextColor="#666" />
              </View>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#a855f7' }]} onPress={executeTrade}><Text style={styles.buttonText}>Execute Trade - Instant - Owner Golden diamond 9</Text></TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active P2P Orders - Better than Binance P2P - Owner Golden diamond 9</Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={loadOrders}><Text style={styles.secondaryButtonText}>Refresh Orders</Text></TouchableOpacity>
              {orders.length === 0 ? <Text style={styles.muted}>No orders - Create one - Owner Golden diamond 9</Text> : orders.slice().reverse().map((o, i) => (
                <View key={i} style={[styles.order, o.type === 'SELL' ? styles.orderSell : styles.orderBuy]}>
                  <Text style={styles.orderText}><Text style={styles.bold}>{o.order_id}</Text> - {o.type} {o.amount} {o.from_token} → {o.to_token} @ {o.price} - Total {o.total?.toFixed(2)} {o.to_token}</Text>
                  <Text style={styles.mutedSmall}>{o.username} {o.profile?.verified ? 'VERIFIED' : ''} - Rating {o.profile?.rating}⭐ - Trades {o.profile?.trades} - {o.payment_method} - {o.status}</Text>
                  <TouchableOpacity style={styles.tinyBtn} onPress={() => setTradeOrderId(o.order_id)}><Text style={styles.tinyBtnText}>Select Order - Trade - Owner Golden diamond 9</Text></TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* AI ROBOTS TAB - OWNER GOLDEN DIAMOND 9 */}
        {activeTab === 'robots' && (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>AI ROBOT Fleet - 9 Robots - Owner Golden diamond 9</Text>
              <Text style={styles.muted}>Each robot: GPT-4o + Quantum 1M Qubits - Battery - Hashrate 100-1000 H/s - Capabilities - Sensors Vision Lidar Thermal Audio - Autonomous - Owner Golden diamond 9</Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={loadRobots}><Text style={styles.secondaryButtonText}>Refresh Robots - AI Fleet</Text></TouchableOpacity>
              {robots.map((r, i) => (
                <View key={i} style={styles.robotCard}>
                  <View style={styles.robotIcon}><Text style={{ fontSize: 24 }}>🤖</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bold}>{r.id} - {r.type} - {r.status}</Text>
                    <Text style={styles.mutedSmall}>Battery {r.battery}% - Tasks {r.tasks} - BRB {r.brb} - UGAS AI {r.ugas} - Hashrate {r.hashrate} H/s - Brain {r.brain}</Text>
                    <View style={styles.battery}><View style={[styles.batteryFill, { width: `${r.battery}%` }]} /></View>
                    <Text style={styles.mutedTiny}>Capabilities: {r.capabilities?.join(', ')}</Text>
                    <View style={styles.row}>
                      <TouchableOpacity style={styles.tinyBtn} onPress={() => { setRobotId(r.id); setChatRobotId(r.id); }}><Text style={styles.tinyBtnText}>Select Robot</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Robot Task Execution - Owner Golden diamond 9</Text>
              <TextInput style={styles.input} value={robotId} onChangeText={setRobotId} placeholder="Robot ID - AI-ROBOT-001-NOMA" placeholderTextColor="#666" />
              <TextInput style={[styles.input, { height: 70 }]} value={robotTask} onChangeText={setRobotTask} placeholder="Task description" multiline placeholderTextColor="#666" />
              <TouchableOpacity style={styles.button} onPress={executeRobotTask}><Text style={styles.buttonText}>Execute Task - AI ROBOT - Autonomous - Owner Golden diamond 9</Text></TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Robot Chat - AI Intelligence - Owner Golden diamond 9</Text>
              <TextInput style={styles.input} value={chatRobotId} onChangeText={setChatRobotId} placeholder="Robot ID for Chat" placeholderTextColor="#666" />
              <TextInput style={styles.input} value={chatMessage} onChangeText={setChatMessage} placeholder="Message - hello, status, work" placeholderTextColor="#666" />
              <TouchableOpacity style={[styles.button, { backgroundColor: '#00e5ff' }]} onPress={chatWithRobot}><Text style={[styles.buttonText, { color: '#000' }]}>Chat with Robot - AI - Owner Golden diamond 9</Text></TouchableOpacity>
              <View style={styles.chatBox}><Text style={styles.chatText}>{chatReply}</Text></View>
            </View>
          </View>
        )}

        {/* DASHBOARD TAB - OWNER GOLDEN DIAMOND 9 */}
        {activeTab === 'dashboard' && (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Dashboard - Owner Golden diamond 9 - BRB + UGAS AI + AI ROBOT + P2P</Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={loadDashboard}><Text style={styles.secondaryButtonText}>Refresh Dashboard - Owner Golden diamond 9</Text></TouchableOpacity>
              {dashboard ? (
                <View>
                  <Text style={styles.bold}>Owner: {dashboard.owner}</Text>
                  <Text style={styles.mutedSmall}>BRB Supply: {dashboard.brb?.supply} - Owner Balance: {dashboard.brb?.owner_balance}</Text>
                  <Text style={styles.mutedSmall}>UGAS AI Supply: {dashboard.ugas_ai?.supply} - Owner Balance: {dashboard.ugas_ai?.owner_balance} - {dashboard.ugas_ai?.name}</Text>
                  <Text style={styles.mutedSmall}>Blockchain: Blocks {dashboard.blockchain?.blocks} - Validators {dashboard.blockchain?.validators} - Chain {dashboard.blockchain?.chain_id}</Text>
                  <Text style={styles.mutedSmall}>AI Robots: Count {dashboard.ai_robots?.count} - Tasks {dashboard.ai_robots?.total_tasks} - BRB Earned {dashboard.ai_robots?.total_brb} - UGAS AI Earned {dashboard.ai_robots?.total_ugas}</Text>
                  <Text style={styles.mutedSmall}>P2P: Orders {dashboard.p2p?.orders} - Trades {dashboard.p2p?.trades} - Users {dashboard.p2p?.users} - {dashboard.p2p?.description}</Text>
                  <Text style={[styles.mutedSmall, { marginTop: 8 }]}>{dashboard.info}</Text>
                </View>
              ) : <Text style={styles.muted}>Loading Dashboard - Owner Golden diamond 9...</Text>}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tokenomics - Owner Golden diamond 9 - Clean</Text>
              <Text style={styles.mutedSmall}>BRB: 10M Supply - 1 BRB = 1 kWh = $0.01 - Power + Energy + Money + Data + AI - 5 in 1 - Main Token - Like BTC - Owner Golden diamond 9 owns 10M BRB</Text>
              <Text style={[styles.mutedSmall, { marginTop: 6 }]}>UGAS AI: 100M Supply - 1 UGAS AI = 0.001 BRB = $0.00001 - Gas + Fuel + Fee - Robot Fuel - Server Fuel - Gas Layer - Like ETH Gas but AI - Owner Golden diamond 9 owns 100M UGAS AI</Text>
              <Text style={[styles.mutedSmall, { marginTop: 6 }]}>Formula: 1 BRB = 1000 UGAS AI = NGN 15 - P2P Fee 0.5% - Blockchain One - Two Tokens - BRB + UGAS AI Inside - P2P Infinity Better than Binance P2P</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Roadmap Q1-Q8 - Owner Golden diamond 9</Text>
              <Text style={styles.mutedTiny}>Q1 Launch: 300K BRB - Genesis - 12 Houses - 60 Robots - 9 AI Robots - Owner Golden diamond 9</Text>
              <Text style={styles.mutedTiny}>Q2 Wallet & Staking + P2P Infinity + AI ROBOT: 1M BRB TVL $100K - P2P Better than Binance - AI Robot Fleet</Text>
              <Text style={styles.mutedTiny}>Q3 DeFi + AI ROBOT Scale: 3M BRB - DEX + Lending - AI Robot Scale 50 Robots</Text>
              <Text style={styles.mutedTiny}>Q4 NFT + P2P NFT + AI ROBOT NFT: 5M BRB - NFT Marketplace - Robot NFT</Text>
              <Text style={styles.mutedTiny}>Q5 Metaverse + AI ROBOT VR: 7M BRB - VR + Land - AI Robot Avatar</Text>
              <Text style={styles.mutedTiny}>Q6 Energy Grid + AI ROBOT Energy: 8.5M BRB - Solar 10MW - 1M kWh/day - $100K/month</Text>
              <Text style={styles.mutedTiny}>Q7 DAO Scale + AI ROBOT DAO: 9.5M BRB - 1M Users - DAO Governance</Text>
              <Text style={styles.mutedTiny}>Q8 Robotics Automation Final Ultimate + AI ROBOT Singularity: 10M BRB $100K/month - 100M UGAS AI - 1000 Houses - 10K Robots - Owner Golden diamond 9 - Final Ultimate</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#111', borderBottomWidth: 1, borderBottomColor: '#222', alignItems: 'center' },
  headerTitle: { color: '#d4af37', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  headerSubtitle: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 6 },
  ownerBadge: { backgroundColor: '#d4af37', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  ownerBadgeText: { color: '#000', fontSize: 10, fontWeight: '800', textAlign: 'center' },
  tabs: { flexDirection: 'row', backgroundColor: '#111', borderBottomWidth: 1, borderBottomColor: '#222' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#d4af37', backgroundColor: '#1a1a0a' },
  tabText: { color: '#888', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#d4af37' },
  content: { flex: 1, padding: 12 },
  card: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardTitle: { color: '#d4af37', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#000', borderWidth: 1, borderColor: '#222', borderRadius: 8, padding: 12, color: '#e5e5e5', fontSize: 13, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  smallBtn: { backgroundColor: '#000', borderWidth: 1, borderColor: '#222', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginBottom: 6 },
  smallBtnActive: { borderColor: '#d4af37', backgroundColor: '#1a1a0a' },
  smallBtnText: { color: '#e5e5e5', fontSize: 11, fontWeight: '600' },
  button: { backgroundColor: '#d4af37', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  buttonText: { color: '#000', fontWeight: '800', fontSize: 13, textAlign: 'center' },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#222', paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  secondaryButtonText: { color: '#e5e5e5', fontSize: 12, fontWeight: '600' },
  tinyBtn: { backgroundColor: '#000', borderWidth: 1, borderColor: '#d4af37', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 6, alignSelf: 'flex-start' },
  tinyBtnText: { color: '#d4af37', fontSize: 10, fontWeight: '700' },
  order: { borderLeftWidth: 3, borderLeftColor: '#00e5ff', backgroundColor: '#0f0f0f', padding: 10, borderRadius: 6, marginBottom: 8 },
  orderSell: { borderLeftColor: '#ef4444' },
  orderBuy: { borderLeftColor: '#22c55e' },
  orderText: { color: '#e5e5e5', fontSize: 12 },
  bold: { fontWeight: '700', color: '#e5e5e5' },
  muted: { color: '#888', fontSize: 12 },
  mutedSmall: { color: '#888', fontSize: 11, marginTop: 4 },
  mutedTiny: { color: '#666', fontSize: 10, marginTop: 4, lineHeight: 14 },
  robotCard: { flexDirection: 'row', backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: '#222', borderRadius: 10, padding: 12, marginBottom: 8, gap: 12 },
  robotIcon: { width: 44, height: 44, backgroundColor: '#1a1a1a', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  battery: { height: 6, backgroundColor: '#222', borderRadius: 3, overflow: 'hidden', marginTop: 6, width: '100%' },
  batteryFill: { height: '100%', backgroundColor: '#22c55e' },
  chatBox: { backgroundColor: '#000', borderWidth: 1, borderColor: '#222', borderRadius: 8, padding: 10, marginTop: 8, minHeight: 60 },
  chatText: { color: '#e5e5e5', fontSize: 12 }
});
