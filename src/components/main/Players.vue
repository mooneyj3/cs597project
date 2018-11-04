<template>
        <v-layout>
            <v-flex xs12>
                <v-card>
                    <v-img src="\images\football-banner2.jpg" aspect-ratio="7"></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Players</h3>
                            <div>NFL Players</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-data-table :headers='headers' :items='players'>
                            <template slot="items" slot-scope="props">
                                <td><a :href="'/players/' + props.item.playerid ">{{ props.item.name }}</a></td>
                                <td class="text-xs-right">{{ props.item.position }}</td>
                                <td class="text-xs-right">{{ props.item.ranking }}</td>
                                <td class="text-xs-right">{{ props.item.projpoints }}</td>
                            </template>
                        </v-data-table>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
    export default {
        name: "players",
        data() {
            return {
                headers: [
                    {text: 'Player', align: 'left', sortable: true, value: 'name'},
                    {text: 'Position', align: 'center', sortable: true, value: 'position'},
                    {text: 'Ranking', align: 'center', sortable: true, value: 'ranking'},
                    {text: 'Projected Points', align: 'center', sortable: true, value: 'projpoints'},
                ],
                players: [
                    {value: true, name: "Kerryon Johnson", position: 'RB', ranking: '27', projpoints: '18.6', playerid: '1234'}
                ]
            }}
    }
</script>

<style scoped>

</style>
