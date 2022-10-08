import { atom } from 'recoil';
import { Dataset, DatasetsData, MapResolution, MojeIDData } from './types';

export const mojeIDStorageKey = 'mojeIDLoggedIn';
export const mojeIDDataState = atom<MojeIDData | null>({
  key: 'mojeIDData',
  default: JSON.parse(localStorage.getItem(mojeIDStorageKey)!),
});

export const mojeIDInitializedState = atom<boolean>({
  key: 'mojeIDInitialized',
  default: false,
});

export const datasetsLoadedState = atom<{
  public: 'none' | 'loading' | 'loaded';
  user: 'none' | 'loading' | 'loaded';
}>({
  key: 'datasetsLoaded',
  default: {
    public: 'none',
    user: 'none',
  },
});

export const mapResolutionState = atom<MapResolution>({
  key: 'mapResolution',
  default: 'regions',
});

export const datasetsState = atom<Dataset[]>({
  key: 'datasets',
  default: [],
});

export const datasetsUserState = atom<Dataset[]>({
  key: 'datasetsUser',
  default: [],
});

export const datasetsDataState = atom<DatasetsData>({
  key: 'datasetsData',
  default: {},
});