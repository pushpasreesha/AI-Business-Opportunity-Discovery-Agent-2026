import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Moon,
  Bot,
} from "lucide-react";

function Settings() {

  const [settings, setSettings] = useState({
    industry: "AI",
    country: "USA",
    model: "Llama 3.3 70B",
    theme: "Light",
    notifications: true,
    autoRefresh: true,
  });


  const handleChange = (key, value) => {

    setSettings({
      ...settings,
      [key]: value,
    });

  };


  const saveSettings = () => {

    localStorage.setItem(
      "appSettings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully!");

  };


  return (

    <Layout>

      <div className="space-y-8">


        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold flex items-center gap-3">

            <SettingsIcon className="text-blue-600" />

            Settings

          </h1>


          <p className="text-gray-500 mt-2">

            Configure your AI Business Agent preferences.

          </p>

        </div>



        {/* Settings Card */}

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">



          {/* Industry */}

          <div>

            <label className="font-semibold">
              Industry
            </label>


            <select

              value={settings.industry}

              onChange={(e)=>
                handleChange(
                  "industry",
                  e.target.value
                )
              }

              className="w-full border rounded-xl p-3 mt-2"

            >

              <option>AI</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>


            </select>


          </div>




          {/* Country */}

          <div>

            <label className="font-semibold">
              Country
            </label>


            <select

              value={settings.country}

              onChange={(e)=>
                handleChange(
                  "country",
                  e.target.value
                )
              }

              className="w-full border rounded-xl p-3 mt-2"

            >

              <option>USA</option>
              <option>India</option>
              <option>UK</option>


            </select>


          </div>




          {/* AI Model */}

          <div>

            <label className="font-semibold flex gap-2 items-center">

              <Bot size={18}/>

              AI Model

            </label>


            <select

              value={settings.model}

              onChange={(e)=>
                handleChange(
                  "model",
                  e.target.value
                )
              }

              className="w-full border rounded-xl p-3 mt-2"

            >

              <option>
                Llama 3.3 70B
              </option>

              <option>
                Gemini
              </option>

              <option>
                GPT
              </option>


            </select>


          </div>





          {/* Theme */}

          <div>

            <label className="font-semibold flex gap-2 items-center">

              <Moon size={18}/>

              Theme

            </label>


            <select

              value={settings.theme}

              onChange={(e)=>
                handleChange(
                  "theme",
                  e.target.value
                )
              }

              className="w-full border rounded-xl p-3 mt-2"

            >

              <option>
                Light
              </option>

              <option>
                Dark
              </option>


            </select>


          </div>





          {/* Toggles */}

          <div className="space-y-4">


            <div className="flex justify-between items-center">


              <div className="flex gap-3 items-center">

                <Bell />

                <span className="font-semibold">
                  Enable Notifications
                </span>

              </div>



              <input

                type="checkbox"

                checked={settings.notifications}

                onChange={(e)=>
                  handleChange(
                    "notifications",
                    e.target.checked
                  )
                }

                className="w-5 h-5"

              />


            </div>




            <div className="flex justify-between items-center">


              <span className="font-semibold">
                Auto Refresh Analysis
              </span>


              <input

                type="checkbox"

                checked={settings.autoRefresh}

                onChange={(e)=>
                  handleChange(
                    "autoRefresh",
                    e.target.checked
                  )
                }

                className="w-5 h-5"

              />


            </div>


          </div>





          {/* Save Button */}


          <button

            onClick={saveSettings}

            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"

          >

            <Save size={20}/>

            Save Settings

          </button>



        </div>


      </div>


    </Layout>

  );

}


export default Settings;
