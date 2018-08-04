import React, { Component } from 'react'
import {  View, Text, Image, TouchableOpacity } from 'react-native'
import Swiper from './Swiper'
import styles from './Styles/LandingStyles'
import { Images } from 'App/Themes'
import ListItem from 'App/Components/ListItem'

export default class Landing extends Component {

    render() {
        return (
            <Swiper showsButtons={false} loop={false} style={styles.section}>
                <View style={styles.slide} key={1}>
                    <Text style={[styles.motivation, styles.slideText]}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
                </View>
                <View style={styles.slide} key={2}>
                    <Text style={styles.slideTitle}>Преимущества для криптоинвесторов:</Text>
                    <ListItem
                        number={21}
                        text={`Единое пространство общения с основными\nучастниками ICO-рынка`}
                    />
                    <ListItem
                        number={22}
                        text={`Доступ к перспективным\nочищенным от скама проектам`}
                    />
                    <ListItem
                        number={23}
                        text={`Безопасная передача средств в\nдоверительное управление`}
                    />
                </View>
                <View style={styles.slide} key={3}>
                    <Text style={styles.slideTitle}>Преимущества для управляющих активами:</Text>
                    <ListItem
                        number={34}
                        text={`Возможность публичного ведения\nинвестиционного портфеля`}
                    />
                    <ListItem
                        number={35}
                        text={`Возможность получения средств в\nдоверительное управление`}
                    />
                    <ListItem
                        number={36}
                        text={`Удобная инфраструктура для\nпривлечения клиентов`}
                    />
                </View>
                <View style={styles.slide} key={4}>
                    <Text style={styles.slideTitle}>Преимущества для проектов:</Text>
                    <ListItem
                        number={41}
                        text={`Доступ к активной целевой\nаудитории`}
                    />
                    <ListItem
                        number={42}
                        text={`Повышенное доверие со стороны\nинвесторов`}
                    />
                    <ListItem
                        number={43}
                        text={`Минимальная стоимость\nпроведения ICO`}
                    />
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