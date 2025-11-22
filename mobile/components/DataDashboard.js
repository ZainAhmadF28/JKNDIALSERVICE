/**
 * JKN DIAL SERVICE PROTOTYPE - Data Dashboard Component
 * 
 * Copyright (c) 2025 Global Palvion. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import data
import pesertaData from '../data/peserta.json';
import faskesData from '../data/faskes.json';
import riwayatData from '../data/riwayat.json';
import tagihanData from '../data/tagihan.json';

export default function DataDashboard({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState('peserta');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderPesertaCard = (item, index) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nama}</Text>
        <View style={[
          styles.badge,
          { backgroundColor: item.status === 'Aktif' ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.label}>NIK:</Text>
          <Text style={styles.value}>{item.nik}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kelas:</Text>
          <Text style={styles.value}>{item.kelas}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>FKTP:</Text>
          <Text style={styles.value}>{item.fktp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>No. HP:</Text>
          <Text style={styles.value}>{item.noHP}</Text>
        </View>
        {item.email ? (
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{item.email}</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{item.alamat}</Text>
        </View>
      </View>
    </View>
  );

  const renderFaskesCard = (item, index) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nama}</Text>
        <View style={[styles.badge, { backgroundColor: '#2196F3' }]}>
          <Text style={styles.badgeText}>{item.jenis}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.label}>Kode:</Text>
          <Text style={styles.value}>{item.kode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kab/Kota:</Text>
          <Text style={styles.value}>{item.kabupaten}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kecamatan:</Text>
          <Text style={styles.value}>{item.kecamatan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{item.alamat}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Telp:</Text>
          <Text style={styles.value}>{item.telp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kuota/Hari:</Text>
          <Text style={styles.value}>{item.kuotaHari} pasien</Text>
        </View>
      </View>
    </View>
  );

  const renderRiwayatCard = (item, index) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.faskes}</Text>
        <View style={[styles.badge, { backgroundColor: '#FF9800' }]}>
          <Text style={styles.badgeText}>{item.jenis}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.label}>NIK:</Text>
          <Text style={styles.value}>{item.nik}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tanggal:</Text>
          <Text style={styles.value}>{item.tanggal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Detail:</Text>
          <Text style={styles.value}>{item.detail}</Text>
        </View>
      </View>
    </View>
  );

  const renderTagihanCard = (item, index) => {
    const total = item.jumlah + item.tunggakan + item.denda;
    const hasOutstanding = item.tunggakan > 0 || item.denda > 0;

    return (
      <View key={index} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Tagihan {item.bulan}</Text>
          <View style={[
            styles.badge,
            { backgroundColor: hasOutstanding ? '#F44336' : '#4CAF50' }
          ]}>
            <Text style={styles.badgeText}>
              {hasOutstanding ? 'Belum Lunas' : 'Lunas'}
            </Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.row}>
            <Text style={styles.label}>NIK:</Text>
            <Text style={styles.value}>{item.nik}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Iuran Bulanan:</Text>
            <Text style={styles.value}>{formatCurrency(item.jumlah)}</Text>
          </View>
          {item.tunggakan > 0 && (
            <View style={styles.row}>
              <Text style={[styles.label, styles.warning]}>Tunggakan:</Text>
              <Text style={[styles.value, styles.warning]}>
                {formatCurrency(item.tunggakan)}
              </Text>
            </View>
          )}
          {item.denda > 0 && (
            <View style={styles.row}>
              <Text style={[styles.label, styles.warning]}>Denda:</Text>
              <Text style={[styles.value, styles.warning]}>
                {formatCurrency(item.denda)}
              </Text>
            </View>
          )}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'peserta':
        return (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              Data Peserta ({pesertaData.length})
            </Text>
            <Text style={styles.sectionDescription}>
              Contoh data peserta untuk simulasi USSD
            </Text>
            {pesertaData.map(renderPesertaCard)}
          </View>
        );
      case 'faskes':
        return (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              Data Fasilitas Kesehatan ({faskesData.length})
            </Text>
            <Text style={styles.sectionDescription}>
              Daftar FKTP, RS, dan Klinik untuk simulasi
            </Text>
            {faskesData.map(renderFaskesCard)}
          </View>
        );
      case 'riwayat':
        return (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              Riwayat Pelayanan ({riwayatData.length})
            </Text>
            <Text style={styles.sectionDescription}>
              History kunjungan peserta ke fasilitas kesehatan
            </Text>
            {riwayatData.map(renderRiwayatCard)}
          </View>
        );
      case 'tagihan':
        return (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              Data Tagihan ({tagihanData.length})
            </Text>
            <Text style={styles.sectionDescription}>
              Informasi iuran dan tunggakan peserta
            </Text>
            {tagihanData.map(renderTagihanCard)}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard Data Simulasi</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'peserta' && styles.activeTab]}
            onPress={() => setActiveTab('peserta')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'peserta' && styles.activeTabText
            ]}>
              Peserta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'faskes' && styles.activeTab]}
            onPress={() => setActiveTab('faskes')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'faskes' && styles.activeTabText
            ]}>
              Faskes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'riwayat' && styles.activeTab]}
            onPress={() => setActiveTab('riwayat')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'riwayat' && styles.activeTabText
            ]}>
              Riwayat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'tagihan' && styles.activeTab]}
            onPress={() => setActiveTab('tagihan')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'tagihan' && styles.activeTabText
            ]}>
              Tagihan
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {renderContent()}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#009688',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: '#009688'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  activeTabText: {
    color: '#009688'
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  cardBody: {
    padding: 15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8
  },
  label: {
    fontSize: 14,
    color: '#666',
    width: 110,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: '500',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  warning: {
    color: '#F44336'
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    width: 110,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#009688',
    flex: 1,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    })
  }
});
