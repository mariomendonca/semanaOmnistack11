import React, {useEffect, useState}from 'react'
import { View, Text,Image, TouchableOpacity, FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useNavigation} from '@react-navigation/native'

import api from '../../services/api'

// <Image source={logo}/>
export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total,setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation() 

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {incident})
    }
    
    async function loadIncidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total){
            return
        }

        setLoading(true)

        const res = await api.get('incidents', {
            params: {page}
        })

        setIncidents([...incidents, ...res.data])
        setTotal(res.header['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [] )

    return (
        <View Style={styles.conteiner}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um caso</Text>

            <FlatList 
            style={styles.incidentList}
            data={[incidents]}
            keyExtractor={incident => Sting(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2} //valor em % ou seja 20%
            renderItem={({item: incident}) => (
                <View style={styles.Incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
                    <Text style={styles.IncidentValue}>{incident.name}</Text>

                    <Text style={styles.IncidentProperty}>caso</Text>
                    <Text style={styles.IncidentValue}>{incident.title}</Text>
                    
                    <Text style={styles.IncidentProperty}>Valor:</Text>
                    <Text style={styles.IncidentValue}>
                        {Intl.NumberFormat('pt-BR', 
                        {style: 'currency',currency: 'BRL'}).format(incident.value)}
                    </Text>

                    <TouchableOpacity 
                      style={styles.detailsButton }
                      onPress={() => navigateToDetail(incident)} //se precisar passar parametros pra funcao precisa fazer uma arrow func
                      >
                          <Text style={styles.detailsButtonText}>ver mais detalhes</Text>
                          <Feather name="arrow-right" size={16} color="#E02041"/>
                      </TouchableOpacity>
                </View>
            )}
            />

        </View>
    )
}