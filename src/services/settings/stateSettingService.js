import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import PaginatedResponse from '@/model/PaginatedResponse';
import State from '@/model/State';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

//.env file config for getting api endpoint
const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getStates(filters) {
  return httpService.get('states', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

//single data calling from this function
export const getState = (stateId) => {
  return httpService.get(`states/${stateId}`, {
    ...config,
  });
};

//get all data from state api following the filters conditions
export const useGetStates = (filters) => {
  return useQuery({
    queryKey: ['states', JSON.stringify(filters)],
    queryFn: () => getStates(filters),
    refetchOnWindowFocus: false,
    select: (response) => {
      // console.log(response);
      return new PaginatedResponse(response.data.data, State);
    },
  });
};

//state data add service function here
const addState = (state) => {
  return httpService.post('states', state, {
    ...config,
  });
};

//Single Edit data of state functional service here ....
const editState = (state) => {
  return httpService.put(`states/${state.id}`, state, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleState = (stateId) => {
  return useQuery({
    queryKey: ['states', stateId],
    queryFn: () => getState(stateId),
    refetchOnWindowFocus: false,
    select: (response) => new State(response.data?.data?.content[0]),
  });
};

//data create from ui to db service ...
export const useAddState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-states'],
    mutationFn: addState,
    select: (response) => new State(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-state'],
    mutationFn: editState,
    select: (response) => new State(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['states', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });
};

//export all service as default ...
const stateSettingService = {
  getState: getState,
  useGetSingleState: useGetSingleState,
  useAddState: useAddState,
  useEditState: useEditState,
};

export default stateSettingService;
