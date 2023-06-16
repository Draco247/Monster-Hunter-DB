import csv
import urllib.request
from PIL import Image
from bs4 import BeautifulSoup
import requests
import pandas as pd
from io import BytesIO
import mysql.connector
headers = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
base_url = "https://mhrise.kiranico.com/"
mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="ShadowSlash247",
            database="monster_hunter"
        )


class Scraper(object):

    def __init__(self, headers, base_url, mydb):
        self.headers = headers
        self.base_url = base_url
        self.mydb = mydb

    def get_monster(self):
        url = f"{base_url}data/monsters?view=lg"
        session = requests.Session()
        r = session.get(url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        self.get_monster_pages(soup)

    def get_monster_pages(self, soup):
        all_monsters = soup.find_all("div", attrs={"class": "group relative p-4 border-r border-b border-gray-200 dark:border-gray-800 sm:p-6"})
        # print(all_monsters)
        for monster in all_monsters[1:2]:
            # print(monster)
            monster_name = monster.find('a') 
            monster_name = monster_name.text.strip()
            monster_img = monster.find('img')["src"]
            link = monster.find('a')['href']
            monster_id = link.split("monsters/")[1]
            print(monster_name)
            # print(link)
            # print(monster_img)
            # print(monster_id)
            # sql = "INSERT INTO monsters (name, link, image_link, monster_id) VALUES (%s,%s,%s,%s)"
            # val = ([monster_name,link,monster_img, monster_id])
            # mycursor = mydb.cursor()
            # # print(mycursor)
            # mycursor.execute(sql,val)
            # # print(mycursor)
            
            # response = requests.get(monster_img)
            # image = Image.open(BytesIO(response.content))
            # image.show()
            session = requests.Session()
            r = session.get(link, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            print(self.get_monster_details(soup, monster_id))
            # if monster_name == "Gold Rathian":
            #     print(monster_name)
                
                # print(monster_name)
        mydb.commit()

    def get_monster_details(self, soup, monster_id):
        # hitzones = []
        # get_hitzones = self.get_monster_physiology(soup, hitzones)
        # drops = []
        # get_drops = self.get_monster_drops(soup, drops)
        quests = []
        get_quests = self.get_monster_quests(soup,quests, monster_id)
        # print(hitzones)
        # print(drops)
        # print(quests)
        # self.get_monster_drops(soup)

    def get_monster_physiology(self, soup, hitzones):
        monster_hitzones = soup.find_all('table')[0]# find monster phys table on page
        rows = monster_hitzones.find_all('tr')
        for row in rows:# extract all important details from the table such as hitzone values for the different weapon types
            hitzone = row.find_all('td')[0].text
            hitzone_state = row.find_all('td')[1].text
            blade_hitzone_value = row.find_all('td')[2].text
            blunt_hitzone_value = row.find_all('td')[3].text
            gunner_hitzone_value = row.find_all('td')[4].text
            fire_hitzone_value = row.find_all('td')[5].text
            water_hitzone_value = row.find_all('td')[6].text
            ice_hitzone_value = row.find_all('td')[7].text
            thunder_hitzone_value = row.find_all('td')[8].text
            dragon_hitzone_value = row.find_all('td')[9].text
            stun_hitzone_value = row.find_all('td')[10].text
            hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value, 'blunt hitzone': blunt_hitzone_value,
                             'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value, 'water hitzone': water_hitzone_value,
                              'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value, 'dragon hitzone': dragon_hitzone_value,
                               'stun': stun_hitzone_value})
        return hitzones
        # return monster_hitzones

    def get_monster_drops(self, soup, parts):
        monster_drop_table = soup.find_all('table')[5] # find monster drop/carves table on page
        rows = monster_drop_table.find_all('tr')
        for row in rows:# extract all useful information such as the item name, where it can be dropped from, percentage, etc
            item_name = row.find('a').text
            quest_rank = row.find_all("td")[1].text
            method = row.find_all("td")[2].text
            area = row.find_all("td")[3].text
            amount = row.find_all("td")[4].text
            rate = row.find_all("td")[5].text
            # print(item_name)
            # print(quest_rank)
            # print(method)
            # print(area)
            # print(amount)
            # print(rate)
            monster_item = {"Monster Part": item_name, "Monster Part Rank": quest_rank , "Drop Method": method, "Drop Area": area,
                            "Amount": amount, "Drop Rate": rate}
            parts.append(monster_item)
        return parts
            # print(monster_item)
            # print("----------")
        # print(monster_drop_table)

    def get_monster_quests(self, soup, quests, monster_id):
        quest_table = soup.find_all("table")[4]
        rows = quest_table.find_all("tr")
        for row in rows[0:1]:
            quest_name = row.find("a").text
            quest_link = row.find('a')['href']
            quest_id = quest_link.split("quests/")[1]
            print(quest_link)
            print(quest_id)
            session = requests.Session()
            r = session.get(quest_link, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            quest_objective = soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("(")[0].strip()
            print(quest_objective)
            hunter_rank_points = soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("HRP:")[1].split("pts")[0].strip()
            print(hunter_rank_points)
            master_rank_points = soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("MRP:")[1].split("pts")[0].strip()
            print(master_rank_points)
            failure_conditions = soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[1].text.split("Conditions")[1].strip()
            print(failure_conditions)

            # sizes_table = soup.find_all("div", attrs={"class": "basis-1/5"})
            sizes_table = soup.find(lambda tag: tag.name == "div" and
                                   "basis-1/5" in tag.get("class", []) and
                                   tag.find("a", href=lambda href: monster_id in href)).find("table")


            # print(sizes_table)
            mini_crown_chances = []
            king_crown_chances = []
            mini_crowns = sizes_table.select(f'tr:has(img[src*="crown_mini"])')
            # print(mini_crowns)
            for mini_crown in mini_crowns:
                size = mini_crown.text.strip().split(" ")[0].replace("\n", "")
                chance = mini_crown.text.strip().split(" ")[-1].replace("\n", "")
                mini_crown_chances.append({size:chance})
            print(mini_crown_chances)
            king_crowns = sizes_table.select(f'tr:has(img[src*="crown_king"])')
            for king_crown in king_crowns:
                size = king_crown.text.strip().split(" ")[0].replace("\n", "")
                chance = king_crown.text.strip().split(" ")[-1].replace("\n", "")
                king_crown_chances.append({size:chance})
            print(king_crown_chances)

            quest_rewards_table = soup.find(lambda tag: tag.name == "div" and
                                   "basis-1/2" in tag.get("class", [])).find("table")
            # print(quest_rewards_table)

            rewards_rows = quest_rewards_table.find_all("tr")
            for reward_row in rewards_rows:
                # print(reward_row)
                item_name = reward_row.find("a").text
                print(item_name)
                quantity = reward_row.find_all("td")[2].text
                print(quantity)
                reward_chance = reward_row.find_all("td")[3].text
                print(reward_chance)
                
            # selected_monster_rows = sizes_table.select(f'a[href*="{monster_id}"]')#need to get mini and king crown sizes
            # print(selected_monster_rows)
        #     gold_crowns = row.find_all("td")[0].find_all("div")[-1]
        #     # quest_areas = []
        #     gold_crown_chances = gold_crowns.text.strip().replace(" ", "").split()
        #     # num_players = row.find_all("td")[1].text
        #     monster_HP_values = row.find_all("td")[2].find_all("div")
        #     monster_HP = []
        #     for value in monster_HP_values:
        #         monster_HP.append(value.text)
        #     # print(monster_HP)
        #     monster_quests = {"Quest Name" : quest_name, "Gold Crown Chances": gold_crown_chances, "Monster HP" : monster_HP}
        #     quests.append(monster_quests)
        # return quests


   


    def get_all_weapon(self):
        weapon_ids = list(range(0, 14))
        url = f"{base_url}data/weapons?view={12}"
        session = requests.Session()
        r = session.get(url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        print(self.get_all_item_details(soup, 12))
        # for i in weapon_ids:
        #     url = f"{base_url}data/weapons?view={i}"
        #     session = requests.Session()
        #     r = session.get(url, headers=headers)
        #     soup = BeautifulSoup(r.content, "html.parser")
        #     # print(soup)
        #     print(self.get_all_item_details(soup, i))

    def get_all_item_details(self, soup, wpn_id):
        table = soup.find("table", attrs={
            "class": "min-w-full divide-y divide-slate-100 dark:divide-slate-400/10"})

        table_body = table.find('tbody')
        rows = table_body.find_all('tr')

        elementset = {"5": "Dragon", "2": "Water", "1": "Fire", "9": "Blast", "3": "Thunder", "4": "Ice", "7": "Sleep",
                      "6": "Poison",
                      "8": "Paralysis", }

        if wpn_id == 5:  # hunting horn section
            print("ok")
            # for row in rows:
            #     wpn_name = row.find('a')
            #     wpn_name = [ele.text.strip() for ele in wpn_name]
            #
            #     attack_val = row.find('div', attrs={"data-key": "attack"})
            #     attack_val = [ele.text.strip() for ele in attack_val]
            #
            #     element = row.find_all('img')[-1]['src']
            #     element_val = ""
            #
            #     if "Element" in element:
            #         element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
            #         element_val = row.find('span', attrs={"data-key": "elementAttack"})
            #         element_val = [ele.text.strip() for ele in element_val]
            #     else:
            #         element = ""
            #
            #     songs = row.find_all('div', attrs={"class": "columns-3"})
            #     songs = [ele.text.strip() for ele in songs]
            #
            #     rarity = row.find_all('small')[-1]
            #     rarity_val = [ele.text.strip() for ele in rarity]
            #
            #     print(wpn_name, attack_val, element, element_val, songs, rarity_val)
            # print(data)

        if wpn_id == 7 or wpn_id == 8 or wpn_id == 9:  # gunlance/switch axe/charge blade section needs to have phial type and level
            print("ok")
            # for row in rows:
            #     wpn_name = row.find('a')
            #     wpn_name = [ele.text.strip() for ele in wpn_name]
            #
            #     attack_val = row.find('div', attrs={"data-key": "attack"})
            #     attack_val = [ele.text.strip() for ele in attack_val]
            #
            #     element = row.find_all('img')[-1]['src']
            #     element_val = ""
            #
            #     if "Element" in element:
            #         element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
            #         element_val = row.find('span', attrs={"data-key": "elementAttack"})
            #         element_val = [ele.text.strip() for ele in element_val]
            #     else:
            #         element = ""
            #
            #     phial_type = row.find_all('div', attrs={"class": "columns-3"})
            #     phial_type = [ele.text.strip() for ele in phial_type]
            #
            #     rarity = row.find_all('small')[-1]
            #     rarity_val = [ele.text.strip() for ele in rarity]
            #
            #     print(wpn_name, attack_val, element, element_val, phial_type, rarity_val)

        if wpn_id == 10:  # insect glaive section needs to have kinsect level
            print("ok")
            # for row in rows:
            #     wpn_name = row.find('a')
            #     wpn_name = [ele.text.strip() for ele in wpn_name]
            #
            #     attack_val = row.find('div', attrs={"data-key": "attack"})
            #     attack_val = [ele.text.strip() for ele in attack_val]
            #
            #     element = row.find_all('img')[-1]['src']
            #     element_val = ""
            #
            #     if "Element" in element:
            #         element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
            #         element_val = row.find('span', attrs={"data-key": "elementAttack"})
            #         element_val = [ele.text.strip() for ele in element_val]
            #     else:
            #         element = ""
            #
            #     kinsect_lvl = row.find_all('div', attrs={"class": "columns-3"})
            #     kinsect_lvl = [ele.text.strip() for ele in kinsect_lvl]
            #
            #     rarity = row.find_all('small')[-1]
            #     rarity_val = [ele.text.strip() for ele in rarity]
            #
            #     print(wpn_name, attack_val, element, element_val, kinsect_lvl, rarity_val)

        if wpn_id == 11:  # bow section
            for row in rows:
                wpn_name = row.find('a')
                wpn_name = wpn_name.text.strip()

                attack_val = row.find('div', attrs={"data-key": "attack"})
                attack_val = attack_val.text.strip()

                element = row.find_all('img')[-1]['src']
                element_val = ""

                if "Element" in element:
                    element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
                    element_val = row.find('span', attrs={"data-key": "elementAttack"})
                    element_val = element_val.text.strip()
                else:
                    element = ""

                arc_shot = row.find_all('div', attrs={"class": "text-green-500"})[0]
                arc_shot = arc_shot.text.strip()

                arrow_lvl = row.find_all('small')[3]  # need to remove the arc shot part from the array
                arrow_lvl = [ele.text.strip() for ele in arrow_lvl]
                arrow_lvl = arrow_lvl[3:]
                # arrow_lvl = arrow_lvl[arrow_lvl.index()]

                bow_coatings = row.find_all('div', attrs={"class": "columns-3"})
                bow_coatings = [ele.text.strip() for ele in bow_coatings]

                rarity = row.find_all('small')[-1]
                rarity_val = rarity.text.strip()

                print(wpn_name, attack_val, element, element_val, arc_shot, arrow_lvl, bow_coatings, rarity_val)

        if wpn_id == 12 or wpn_id == 13:  # hbg and lbg section will come back to it latr since its the only part breaking
            # print("ok")
            for row in rows:
                wpn_name = row.find('a')
                if wpn_name is not None:
                    wpn_name = [ele.text.strip() for ele in wpn_name]
                    print(wpn_name)

                attack_val = row.find('div', attrs={"data-key": "attack"})
                if attack_val is not None:
                    attack_val = [ele.text.strip() for ele in attack_val]
                    print(attack_val)
                print(attack_val)

            #     table = row.find('table')
            #     ammo = []
            #     if table is not None:
            #         gun_info = table.findAll('td')
            #         for g in gun_info:
            #             gun_info_info = g.find_all('div')
            #             if len(gun_info_info) > 0:
            #                 drr = [gun_info_info[0].text.strip(), gun_info_info[1].text.strip(), gun_info_info[2].text.strip()]
            #                 # print(deviation[0])
            #                 print(drr)
            #             ammo_info = g.find_all('table')

            #             if len(ammo_info) > 0:
            #                 # print([ammo_info[0].text.strip().replace("\n", "")])
            #                 ammo += [ammo_info[0].text.strip().replace("\n", "")]
            #                 print(ammo)
            #     # deviation = gun_info.find_all('td')
            #     # print(gun_info)
            #     # print(deviation)
            #     # if deviation is not None:
            #     #     print([ele.text.strip() for ele in deviation])

            #     rarity_val = row.find_all('small')
            #     # print(rarity_val.text)
            #     if rarity_val is not None:
            #         rarity_val = [ele.text.strip() for ele in rarity_val]
            # print(wpn_name)


webscrape = Scraper(headers, base_url,mydb)
# webscrape.get_all_weapon()
webscrape.get_monster()