<template>
  <div class="rick-and-morty">
    <DataTable
        :value="characters"
        :paginator="true"
        :rows="20"
        :filters.sync="filters"
        ref="dt"
        dataKey="id"
        :totalRecords="totalRecords "
        :loading="loading"
        @page="onPage($event)"
        filterDisplay="row"
        :rowHover="true"
        :scrollable="true"
        scrollHeight="flex"
        :globalFilterFields="['name']"
        @row-click="rowClick($event.data)"
    >
      <template #header>
        <div class="flex justify-content-between align-items-center">
          <h1 class="m-0">Characters</h1>
        </div>
      </template>
      <template #empty>
        No characters found.
      </template>

      <Column field="name" header="Name" filterField="name" :showFilterMenu="false" :style="{width: '20%'}">
        <template #body="{data}">
          <div style="display: flex;" class="card">
            <Avatar :image="data.image" size="xlarge" style="margin-right: 10px" shape="circle"/>
            <h4>{{ data.name }}</h4>
          </div>
        </template>
        <template #filter>
          <InputText type="text" v-model="filters.name" class="p-column-filter" placeholder="Search by name"
                     @keydown="filtersChange()"/>
        </template>
      </Column>

      <Column field="status" filterField="status" header="Status" :showFilterMenu="false" :style="{width: '20%'}">
        <template #body="{data}">
          <span class="image-text">{{ data.status }}</span>
        </template>
        <template #filter>
          <Dropdown
              v-model="filters.status"
              :showClear="true"
              :options="statuses"
              option-label="name"
              option-value="key"
              @change="filtersChange()"
              placeholder="Select a Status of character"/>
        </template>
      </Column>

      <Column field="type" header="Type" :showFilterMenu="false" :style="{width: '20%'}">
        <template #body="{data}">
          <span class="image-text">{{ data.type | emptyValue }}</span>
        </template>
        <template #filter>
          <InputText type="text" v-model="filters.type" class="p-column-filter" placeholder="Search by type"
                     @keydown="filtersChange()"/>
        </template>
      </Column>

      <Column field="gender" header="Gender" :showFilterMenu="false" :style="{width: '20%'}">
        <template #body="{data}">
          <span class="image-text">{{ data.gender }}</span>
        </template>
        <template #filter>
          <Dropdown
              v-model="filters.gender"
              :showClear="true"
              :options="genders"
              option-label="name"
              option-value="key"
              @change="filtersChange()"
              placeholder="Select a gender"/>
        </template>
      </Column>

      <Column field="species" header="Species" :style="{width: '20%'}">
        <template #body="{data}">
          <span class="image-text">{{ data.species }}</span>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {HttpClass} from '@/plugins/http.plugin';
import {
  IRickAndMortyAllRequestConfig,
  RickAndMortyCharacter,
  RickAndMortyCharacterGenderEnum,
  RickAndMortyCharacterStatusEnum,
  RickAndMortyResponse
} from '@/store/models/types/RickAndMorty/RickAndMortyCharacter';
import {mapActions, mapMutations} from 'vuex';
import {AxiosError} from 'axios';
import moment from 'moment';

interface IFilter {
  name: string;
  status?: RickAndMortyCharacterStatusEnum | '';
  type: string;
  gender?: RickAndMortyCharacterGenderEnum | '';
}

@Component({
  methods: {
    ...mapActions('rickAndMorty', {
      getAllCharacters: 'all'
    }),
    ...mapMutations('simpleDialog', {
      setSimpleDisplayDialog: 'setDisplayDialog',
      setSimpleContent: 'setContent',
      setSimpleButtons: 'setButtons',
      setSimpleHeader: 'setHeader',
    })
  },
})
export default class RickAndMortyView extends Vue {

  getAllCharacters!: (config: IRickAndMortyAllRequestConfig) => Promise<RickAndMortyResponse>

  setSimpleDisplayDialog!: (value?: boolean) => void;
  setSimpleContent!: (value?: string | Object) => void;
  setSimpleButtons!: (value?: {label: string, action: () => void}[]) => void;
  setSimpleHeader!: (value?: string | {label: string}) => void;

  loading: boolean = true;
  totalRecords: number = 0;
  selectPage: number = 0;
  characters: RickAndMortyCharacter[] = [];
  filters: IFilter = {
    name: '',
    type: '',
  }

  readonly filtersChange = this.debounce(() => {
    this.selectPage = 1;
    this.reload(true)
  })

  readonly statuses = [
    {key: RickAndMortyCharacterStatusEnum.Alive, name: 'Alive'},
    {key: RickAndMortyCharacterStatusEnum.Dead, name: 'Dead'},
    {key: RickAndMortyCharacterStatusEnum.unknown, name: 'Unknown'},
  ]

  readonly genders = [
    {key: RickAndMortyCharacterGenderEnum.Male, name: 'Male'},
    {key: RickAndMortyCharacterGenderEnum.Female, name: 'Female'},
    {key: RickAndMortyCharacterGenderEnum.Genderless, name: 'Genderless'},
    {key: RickAndMortyCharacterGenderEnum.unknown, name: 'Unknown'},
  ]

  private debounce(func: () => void, timeout = 300) {
    let timer: number;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  mounted() {
    this.reload();
  }

  get allRequestConfig(): IRickAndMortyAllRequestConfig {
    const config: IRickAndMortyAllRequestConfig = {
      page: this.selectPage,
      filters: {}
    };
    if (this.filters.name) {
      config.filters!.name = this.filters.name;
    }
    if (this.filters.status) {
      config.filters!.status = this.filters.status;
    }
    if (this.filters.type) {
      config.filters!.type = this.filters.type;
    }
    if (this.filters.gender) {
      config.filters!.gender = this.filters.gender;
    }
    return config
  }

  onPage($event: any) {
    this.selectPage = $event.page + 1;
    this.reload();
  }

  rowClick(data: RickAndMortyCharacter) {
    const formData = {
      'Name': data.name,
      'Status': data.status,
      'Species': data.species,
      'Type': data.type || '---',
      'Gender': data.gender,
      'Location': data.location.name,
      'Origin': data.origin.name,
      'Created': moment(data.created).format('YYYY-MM-DD HH:MM:SS'),
    }
    this.setSimpleContent(
        `<img src="${data.image}" alt="Image of the character"/>
              <div class="view_form" style="margin-top: 20px">
                 <table class="view-form__table">
                      ${Object.keys(formData).map(key => '<tr><td>' + key + '</td><td>' + (formData as any)[key] + '</td></tr>').join('')}
                 </table>
               </div>
        `

    );
    this.setSimpleHeader(`Info about ${data.name}`);
    this.setSimpleDisplayDialog(true);
  }

  private reload(forFilters: boolean = false): void {
    this.loading = true;
    setTimeout(() => {
      this.getAllCharacters({...this.allRequestConfig, page: forFilters ? 0 : this.selectPage})
          .then((data: RickAndMortyResponse) => {
            this.characters = data.results;
            this.totalRecords = data.info.count;
          })
          .catch((error: AxiosError) => {
            error.response?.status === 404 ? this.characters = [] : HttpClass.displayErrorHandler(error, this.$store)
          })
          .finally(() => this.loading = false);
    }, 5000)
  }


}
</script>

<style lang="less">
</style>
