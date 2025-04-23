import { Button } from '@/components/ui/button'
import { db } from '@/config'
import { UserResponses } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { LucideClipboardSignature } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

function Responseslist({ jsonFrom, formRecord }) {
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const result = await db
          .select()
          .from(UserResponses)
          .where(eq(UserResponses.formRef, formRecord?.id))

        setResponses(result)
      } catch (err) {
        console.error('Error fetching responses:', err)
      }
    }

    if (formRecord?.id) {
      fetchResponses()
    }
  }, [formRecord?.id])

  const ExportData = async () => {
    const jsonData = []
    setLoading(true)

    const result = await db
      .select()
      .from(UserResponses)
      .where(eq(UserResponses.formRef, formRecord?.id))

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse)
        jsonData.push(jsonItem)
      })
    }

    exportToExcel(jsonData)
    setLoading(false)
  }

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, `${jsonFrom?.formTitle || 'responses'}.xlsx`)
  }

  const handleShowResponses = () => {
    setShowTable(!showTable)
  }

  const getTableHeaders = () => {
    if (responses.length === 0) return []
    const first = JSON.parse(responses[0].jsonResponse)
    return Object.keys(first)
  }

  return (
    <div>
      <div className="border shadow-sm rounded-lg p-4 bg-[#d1d1d1] my-5">
        <h2 className="font-bold text-[#0a0a0a]">{jsonFrom?.formTitle}</h2>
        <h2 className="text-[#454545] text-sm">{jsonFrom?.formSubheading}</h2>
        <hr className="my-4" style={{ borderTop: '1px solid #0a0a0a' }} />
        <div className="flex justify-between gap-2">
          <Button
            size='sm' variant="outline" className='flex gap-2 bg-[#d1d1d1] border-[#3d3d3d]'
            onClick={handleShowResponses}
          >
            {showTable ? 'Hide Responses' : 'Show Responses'}
          </Button>
          <Button
            size="sm"
            className="flex gap-2 bg-[#4f4f4f]"
            onClick={() => ExportData()}
            disabled={loading}
          >
            {loading ? (
              <LucideClipboardSignature className="w-4 h-4 mr-2" />
            ) : (
              'Export'
            )}
          </Button>
        </div>
      </div>

      {/* Table Format Responses */}
      {showTable && responses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Created By</th>
                <th className="border px-2 py-1">Created At</th>
                {getTableHeaders().map((header) => (
                  <th key={header} className="border px-2 py-1">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((resp) => {
                const parsed = JSON.parse(resp.jsonResponse)
                return (
                  <tr key={resp.id}>
                    <td className="border px-2 py-1">{resp.createdBy}</td>
                    <td className="border px-2 py-1">{resp.createdAt}</td>
                    {getTableHeaders().map((key) => (
                      <td key={key} className="border px-2 py-1">
                        {parsed[key]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showTable && responses.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">No responses found.</p>
      )}
    </div>
  )
}

export default Responseslist
