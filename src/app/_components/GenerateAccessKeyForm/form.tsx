"use client"

import { UFCodes } from "@/lib/enums/UFCodes.enum";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/components/ui/select";
import { clearCNPJ, generateCNPJ, prettifyCNPJ, validateCNPJ } from "@/lib/accesskey/cnpj";
import { Check, Copy, QrCode, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useApendCNPJMask } from "@/lib/custom-hooks/use-append-cnpj-mask";
import { mods } from "@/lib/accesskey/mod";
import { cufs } from "@/lib/constants/cufs";
import { getTpEmisByCode, tpEmisList } from "@/lib/accesskey/tpEmis";
import { AccessKey } from "@/lib/accesskey/accesskey";
import { getCUFByCode } from "@/lib/accesskey/cUF";
import { generateSerie } from "@/lib/accesskey/serie";
import { generateNNF } from "@/lib/accesskey/nNF";
import { generateCNF } from "@/lib/accesskey/cNF";
import QRCode from "react-qr-code";
import { useState } from "react";

export const formSchema = z.object({
  cnpj: z.string().refine(v => validateCNPJ(v), {
    message: 'CNPJ inválido',
  }),
  cufCode: z.string().refine((v) => Object.values(UFCodes).includes(Number(v)), {
    message: 'Código de UF inválido',
  }),
  modCode: z.string().refine((v) => mods.some(mod => mod.code === Number(v)), {
    message: 'Código de MOD inválido',
  }),
  tpEmis: z.string().refine((v) => tpEmisList.some(tpEmis => tpEmis.code === Number(v)), {
    message: 'Código de MOD inválido',
  }),
  accessKey: z.string(),
})

export function GenerateAccessKeyForm() {

  const [qrcodeURL, setQrcodeURL] = useState<string>("")
  const [qrCodeShowing, setQrCodeShowing] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: "",
      cufCode: String(UFCodes.RIO_DE_JANEIRO),
      modCode: String(mods[0].code),
      tpEmis: String(tpEmisList[0].code),
      accessKey: "",
    },
  })

  function showQrCode() {
    const ak = form.getValues('accessKey')
    if (ak) {
      setQrcodeURL(AccessKey.clear(ak))
      setQrCodeShowing(true)
    }
  }

  function setRandomCNPJ() {
    const cnpj = generateCNPJ();
    form.setValue('cnpj', prettifyCNPJ(cnpj))
  }

  function copyToClipboard(data: string, description?: string) {
    if (!data || data.length === 0) return
    toast(description ?? "Copiado para área de transferência", {
      duration: 2000,
      dismissible: true,
      position: "top-center"
    })
    navigator.clipboard.writeText(data)
  }

  function checkCNPJ() {
    const cnpj = clearCNPJ(form.getValues('cnpj'))
    if (!cnpj) {
      return
    }
    if (validateCNPJ(cnpj)) {
      toast("CNPJ válido", {
        duration: 2000,
        dismissible: true,
        position: "top-center"
      })
    } else {
      toast("CNPJ inválido", {
        duration: 2000,
        dismissible: true,
        position: "top-center"
      })
    }
  }

  function checkAccessKey() {
    const accessKey = AccessKey.clear(form.getValues('accessKey'))
    if (!accessKey) return
    if (AccessKey.validate(accessKey)) {
      toast("Chave de acesso válida", {
        duration: 2000,
        dismissible: true,
        position: "top-center"
      })
    } else {
      toast("Chave de acesso inválida", {
        duration: 2000,
        dismissible: true,
        position: "top-center"
      })
    }

  }

  useApendCNPJMask("cnpj")

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { tpEmis: tpEmisCode, modCode, cnpj, cufCode } = values

    const cuf = getCUFByCode(Number(cufCode))!
    const mod = mods.find(mod => mod.code === Number(modCode))!
    const tpEmis = getTpEmisByCode(Number(tpEmisCode))!
    const cnpjClean = clearCNPJ(cnpj)

    if (!cuf || !mod || !tpEmis) {
      toast("Erro ao gerar chave de acesso", {
        description: "campos faltando",
        duration: 2000,
      })
      return
    }

    const accessKey = new AccessKey(cuf, cnpjClean, mod, generateSerie(), generateNNF(), tpEmis, generateCNF())
    form.setValue('accessKey', AccessKey.prettify(accessKey.toString()))
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4 my-4 flex-wrap">

            <div className="flex gap-1 justify-center items-center">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000/0000-00" {...field} id="cnpj" onPaste={e => {
                        e.preventDefault()
                        const cnpj = clearCNPJ(e.clipboardData.getData('text'))
                        form.setValue(field.name, prettifyCNPJ(cnpj))
                      }} />
                    </FormControl>
                    <FormDescription>
                      CNPJ emissor da nota
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={setRandomCNPJ} type="button"><RefreshCcw /></Button>
              <Button
                onClick={() => copyToClipboard(clearCNPJ(form.getValues('cnpj')), "CNPJ copiado para área de transferência")}
                type="button"
              >
                <Copy />
              </Button>
              <Button
                onClick={checkCNPJ}
                type="button"
              >
                <Check />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="cufCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl className="w-[200px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        cufs.map(cuf => (
                          <SelectItem
                            key={cuf.code}
                            value={String(cuf.code)}
                            className="w-[200px]"
                          >
                            {cuf.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Código do estado de origem da nota
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl className="w-[200px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        mods.map(mod => (
                          <SelectItem
                            key={mod.code}
                            value={String(mod.code)}
                            className="w-[200px]"
                          >
                            {mod.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Modelo da nota
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tpEmis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Emissão</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl className="w-[500px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de emissão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        tpEmisList.map(tpEmis => (
                          <SelectItem
                            key={tpEmis.code}
                            value={String(tpEmis.code)}
                            className="w-[500px]"
                          >
                            {tpEmis.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormDescription className="w-[500px]">
                    {
                      getTpEmisByCode(Number(field.value))?.description ?? "Modelo da nota"
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <h3 className="text-left mt-4">Chave de acesso</h3>
          <div className="flex gap-1 justify-center items-center w-full">
            <FormField
              control={form.control}
              name="accessKey"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input className="w-full" placeholder={AccessKey.prettify('0'.repeat(44))} {...field} onPaste={e => {
                      e.preventDefault()
                      const ak = AccessKey.clear(e.clipboardData.getData('text'))
                      form.setValue(field.name, AccessKey.prettify(ak))
                    }} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
            >
              <RefreshCcw />
            </Button>
            <Button
              onClick={() => copyToClipboard(AccessKey.clear(form.getValues('accessKey')), "Chave de acesso copiada para área de transferência")}
              type="button"
            >
              <Copy />
            </Button>
            <Button
              onClick={checkAccessKey}
              type="button"
            >
              <Check />
            </Button>
            <Button
              onClick={showQrCode}
              type="button"
            >
              <QrCode />
            </Button>
          </div>
        </form>
      </Form >


      {qrCodeShowing && (
        <div className="flex flex-col gap-2 mt-8">
          <h4>QrCode</h4>
          <Input className="w-full" placeholder="url do qrcode" value={qrcodeURL} onChange={e => setQrcodeURL(e.target.value)} onPaste={e => setQrcodeURL(e.clipboardData.getData('text'))} />
          <QRCode value={qrcodeURL} />
        </div>
      )}
    </div>
  )
}
