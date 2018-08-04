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
                    <Text style={[styles.motivation, styles.slideText]}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
                </View>
                <View style={styles.slide} key={2}>
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
                    <Text style={styles.slideTitle}>Преимущества для управляющих активами:</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>1</Text>
                        <Text style={styles.menuItemText}>{`Возможность публичного ведения\nинвестиционного портфеля`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>2</Text>
                        <Text style={styles.menuItemText}>{`Возможность получения средств в\nдоверительное управление`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>3</Text>
                        <Text style={styles.menuItemText}>{`Удобная инфраструктура для\nпривлечения клиентов`}</Text>
                    </View>
                </View>
                <View style={styles.slide} key={4}>
                    <Text style={styles.slideTitle}>Преимущества для проектов:</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>1</Text>
                        <Text style={styles.menuItemText}>{`Доступ к активной целевой\nаудитории`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>2</Text>
                        <Text style={styles.menuItemText}>{`Повышенное доверие со стороны\nинвесторов`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>3</Text>
                        <Text style={styles.menuItemText}>{`Минимальная стоимость\nпроведения ICO`}</Text>
                    </View>
                </View>
                <View style={styles.slide} key={5}>
                    <Text style={styles.slideTitle}>Как работает:</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>1</Text>
                        <Text style={styles.menuItemText}>{`Элементы блогинга и социальной\nсети позволяют пользователям\nобщаться`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>2</Text>
                        <Text style={styles.menuItemText}>{`Инвесторы, управляющие\nактивами и ICO-проекты заключают\nсделки между собой`}</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemNumber}>3</Text>
                        <Text style={styles.menuItemText}>{`Встроенные escrow-сервисы\nгарантируют соблюдение\nоговорённых условий`}</Text>
                    </View>
                </View>
            </Swiper>
        );
    }
}