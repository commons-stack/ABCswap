import { Button, Input } from "@chakra-ui/react"
import { useRef } from "react"
import { readFile, removeCSVHeaders } from "../utils/csv-utils"

export default function ImportButton ({ onImport, children, ...props }: { onImport: (csv: string) => void, children: React.ReactNode, [x: string]: any }) {
    const fileInput = useRef<HTMLInputElement>(null)
    async function handleChange (file: File) {
      const csv = removeCSVHeaders(await readFile(file))
      onImport(csv)
    }
    const handleClick = () => fileInput.current && fileInput.current.click()
    return (
      <>
        <Button onClick={handleClick} {...props}>{children}</Button>
        <Input
          ref={fileInput}
          sx={{ display: 'none' }}
          type="file"
          accept=".csv"
          onClick={e => ((e.target as HTMLInputElement).value = '')}
          onChange={e => e.target.files && handleChange(e.target.files[0])}
        />
      </>
    )
  }