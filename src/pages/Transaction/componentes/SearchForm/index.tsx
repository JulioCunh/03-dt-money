import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInpunts = zod.infer<typeof SearchFormSchema>;

export function SearchForm() {
  const { register, 
  handleSubmit,
  formState: {isSubmitting}

  } = useForm<SearchFormInpunts>({
    resolver: zodResolver(SearchFormSchema),
  });

 async function handleSearchTransactions(data: SearchFormInpunts) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
   
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" 
      placeholder="Buscar transação"
      {...register("query")}  
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button> 
    </SearchFormContainer>
  );
}