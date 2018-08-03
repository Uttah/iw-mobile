import React, { Component } from 'react'
import {  View, Text, Image, TouchableOpacity } from 'react-native'
import Swiper from './Swiper'
import styles from './Styles/LandingStyles'
import { Images } from 'App/Themes'

export default class Landing extends Component {

    render() {
        return (
            <Swiper showsButtons={false} loop={false} style={styles.section}>
                <View style={styles.slide} key={1}>
                    <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
                    <Text style={[styles.motivation, styles.slideText]}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
                </View>
                <View style={styles.slide} key={2}>
                    <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
                    <Text style={styles.slideTitle}>Преимущества для криптоинвесторов:</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>1</Text>
                        <Text style={styles.menuItemText}>{`Единое пространство общения с основными\nучастниками ICO-рынка`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>2</Text>
                        <Text style={styles.menuItemText}>{`Доступ к перспективным\nочищенным от скама проектам`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>3</Text>
                        <Text style={styles.menuItemText}>{`Безопасная передача средств в\nдоверительное управление`}</Text>
                    </View>
                </View>
                <View style={styles.slide} key={3}>
                    <Text>Третий слайд</Text>
                </View>
            </Swiper>
        );
    }
}