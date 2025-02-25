import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import Currency from '@/model/Currency';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

//.env file config for getting api endpoint
const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getCurrencies(filters) {
  return httpService.get('currencies', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

//single data calling from this function
export const getCurrency = (currencyId) => {
  return httpService.get(`currencies/${currencyId}`, {
    ...config,
  });
};

//get all data from Currency api following the filters conditions
export const useGetCurrencies = (filters) => {
  return useQuery({
    queryKey: ['currencies', JSON.stringify(filters)],
    queryFn: () => getCurrencies(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Currency),
  });
};

// Data Creating  service function here
const addCurrency = (currency) => {
  return httpService.post('currencies', currency, {
    ...config,
  });
};

//Single Edit data of Currency functional service here ....
const editCurrency = (currency) => {
  return httpService.put(`currencies/${currency.id}`, currency, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleCurrency = (currencyId) => {
  return useQuery({
    queryKey: ['currencies', currencyId],
    queryFn: () => getCurrency(currencyId),
    refetchOnWindowFocus: false,
    select: (response) => new Currency(response.data?.data?.content[0]),
  });
};

//data create from ui to db service ...
export const useAddCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-currencies'],
    mutationFn: addCurrency,
    select: (response) => new Currency(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-currency'],
    mutationFn: editCurrency,
    select: (response) => new Currency(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['currencies', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

//export all service as default ...
const currenciesSettingService = {
  getCurrency,
  useGetSingleCurrency,
  useAddCurrency,
  useEditCurrency,
};

export default currenciesSettingService;
