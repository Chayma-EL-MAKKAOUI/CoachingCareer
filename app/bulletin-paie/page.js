import Layout from '../../components/Layout/Layout'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card'
import Button from '../../components/UI/Button'

export default function BulletinPaiePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-6xl">📄</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
            Analyse de Bulletin de Paie
          </h1>
          <p className="text-lg text-gray-600">
            Téléchargez votre bulletin de paie pour obtenir une analyse détaillée automatique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Télécharger votre bulletin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <span className="text-4xl mb-4 block">📎</span>
                <p className="text-gray-600 mb-2">
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500">
                  PDF, JPG, PNG (max 10MB)
                </p>
              </div>
              <Button className="w-full mt-6">
                Analyser mon bulletin
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résultats de l'analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">📊</span>
                <p className="text-gray-500">
                  Aucune analyse disponible. Téléchargez un bulletin pour commencer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
